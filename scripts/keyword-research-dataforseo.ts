/**
 * DataForSEO Keyword Research Helper Script
 * 
 * This script automates keyword research using the DataForSEO API.
 * It reads seed keywords, fetches keyword data, and outputs results to CSV.
 * 
 * Usage:
 *   1. Set up DataForSEO credentials in .env.local:
 *      DATAFORSEO_USERNAME=your_username
 *      DATAFORSEO_PASSWORD=your_password
 * 
 *   2. Run the script:
 *      npx tsx scripts/keyword-research-dataforseo.ts
 * 
 *   3. Review and merge results into seo/keyword-research.csv
 * 
 * Requirements:
 *   - Node.js 18+
 *   - DataForSEO API account with credits
 *   - .env.local file with credentials
 */

import * as fs from 'fs'
import * as path from 'path'

// Types for DataForSEO API responses
interface DataForSEOKeywordInfo {
  keyword: string
  location_code?: number
  language_code?: string
  search_volume?: number
  competition?: number
  cpc?: number
  monthly_searches?: Array<{
    year: number
    month: number
    search_volume: number
  }>
}

interface DataForSEOApiResponse {
  version: string
  status_code: number
  status_message: string
  time: string
  cost?: number
  tasks_count?: number
  tasks_error?: number
  tasks?: Array<{
    id: string
    status_code: number
    status_message: string
    time: string
    cost: number
    result_count: number
    path: string[]
    data: {
      api: string
      function: string
      keyword: string
      location_code: number
      language_code: string
      search_volume: number
      competition: number
      cpc: number
      monthly_searches: Array<{
        year: number
        month: number
        search_volume: number
      }>
    }[]
  }>
}

interface KeywordResult {
  keyword: string
  intent_type: string
  volume: number
  cpc_estimate?: number
  difficulty?: number
  chosen_match_type: string
  target_page: string
  notes: string
}

/**
 * Load environment variables from .env.local
 */
function loadEnv(): { username: string; password: string } {
  const envPath = path.join(process.cwd(), '.env.local')
  
  if (!fs.existsSync(envPath)) {
    throw new Error(
      '.env.local file not found. Please create it with DATAFORSEO_USERNAME and DATAFORSEO_PASSWORD.'
    )
  }

  const envContent = fs.readFileSync(envPath, 'utf-8')
  const envVars: Record<string, string> = {}
  
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=')
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '')
      }
    }
  })

  const username = envVars.DATAFORSEO_USERNAME
  const password = envVars.DATAFORSEO_PASSWORD

  if (!username || !password) {
    throw new Error(
      'DATAFORSEO_USERNAME and DATAFORSEO_PASSWORD must be set in .env.local'
    )
  }

  return { username, password }
}

/**
 * Create Basic Auth header
 */
function createAuthHeader(username: string, password: string): string {
  const credentials = Buffer.from(`${username}:${password}`).toString('base64')
  return `Basic ${credentials}`
}

/**
 * Fetch keyword data from DataForSEO API
 * 
 * API Endpoint: POST https://api.dataforseo.com/v3/keywords_data/google_ads/keywords_for_keywords/task_post
 * 
 * This endpoint allows you to get keyword suggestions and metrics for seed keywords.
 */
async function fetchKeywordData(
  keywords: string[],
  username: string,
  password: string
): Promise<DataForSEOApiResponse> {
  const authHeader = createAuthHeader(username, password)
  
  // Prepare request payload
  const tasks = keywords.map((keyword) => ({
    keyword,
    location_code: 2840, // United Arab Emirates
    language_code: 'en',
    include_serp_info: false,
    sort_by: 'search_volume',
    date_from: '2024-01-01',
    date_to: '2024-12-31',
  }))

  const payload = tasks

  try {
    const response = await fetch(
      'https://api.dataforseo.com/v3/keywords_data/google_ads/keywords_for_keywords/task_post',
      {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `DataForSEO API error (${response.status}): ${errorText}`
      )
    }

    const data: DataForSEOApiResponse = await response.json()
    
    if (data.status_code !== 20000) {
      throw new Error(
        `DataForSEO API error: ${data.status_message} (code: ${data.status_code})`
      )
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch keyword data: ${error.message}`)
    }
    throw error
  }
}

/**
 * Get task results from DataForSEO API
 * 
 * After posting a task, you need to retrieve results using the task ID.
 */
async function getTaskResults(
  taskIds: string[],
  username: string,
  password: string
): Promise<DataForSEOApiResponse> {
  const authHeader = createAuthHeader(username, password)
  
  const payload = taskIds.map((taskId) => ({
    id: taskId,
  }))

  try {
    const response = await fetch(
      'https://api.dataforseo.com/v3/keywords_data/google_ads/keywords_for_keywords/task_get/advanced',
      {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `DataForSEO API error (${response.status}): ${errorText}`
      )
    }

    const data: DataForSEOApiResponse = await response.json()
    
    if (data.status_code !== 20000) {
      throw new Error(
        `DataForSEO API error: ${data.status_message} (code: ${data.status_code})`
      )
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get task results: ${error.message}`)
    }
    throw error
  }
}

/**
 * Classify keyword intent (simplified - can be enhanced with ML or manual review)
 */
function classifyIntent(keyword: string): string {
  const lower = keyword.toLowerCase()
  
  // Transactional indicators
  if (
    lower.includes('set up') ||
    lower.includes('register') ||
    lower.includes('apply') ||
    lower.includes('get') ||
    lower.includes('buy') ||
    lower.includes('instant') ||
    lower.includes('fast')
  ) {
    return 'transactional'
  }
  
  // Commercial indicators
  if (
    lower.includes('cost') ||
    lower.includes('price') ||
    lower.includes('cheapest') ||
    lower.includes('best') ||
    lower.includes('top') ||
    lower.includes('service') ||
    lower.includes('package')
  ) {
    return 'commercial'
  }
  
  // Informational indicators
  if (
    lower.includes('how to') ||
    lower.includes('what is') ||
    lower.includes('guide') ||
    lower.includes('process') ||
    lower.includes('requirements') ||
    lower.includes('vs') ||
    lower.includes('difference')
  ) {
    return 'informational'
  }
  
  // Default to commercial for business keywords
  return 'commercial'
}

/**
 * Determine match type based on keyword characteristics
 */
function determineMatchType(keyword: string): string {
  const wordCount = keyword.split(/\s+/).length
  
  if (wordCount >= 4) {
    return 'long-tail'
  }
  if (wordCount === 1) {
    return 'exact'
  }
  return 'phrase'
}

/**
 * Convert API response to CSV rows
 */
function convertToCSVRows(
  apiResponse: DataForSEOApiResponse,
  seedKeywords: string[]
): KeywordResult[] {
  const results: KeywordResult[] = []

  if (!apiResponse.tasks) {
    return results
  }

  for (const task of apiResponse.tasks) {
    if (task.status_code !== 20000 || !task.data) {
      console.warn(
        `Task ${task.id} failed: ${task.status_message}`
      )
      continue
    }

    for (const keywordData of task.data) {
      const keyword = keywordData.keyword.toLowerCase()
      const volume = keywordData.search_volume || 0
      
      // Skip keywords with very low volume (below threshold)
      if (volume < 30) {
        continue
      }

      const intentType = classifyIntent(keyword)
      const matchType = determineMatchType(keyword)
      
      // Generate target page (blog slug format)
      const slug = keyword
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      const targetPage = `blog/${slug}`

      results.push({
        keyword,
        intent_type: intentType,
        volume,
        cpc_estimate: keywordData.cpc ? Math.round(keywordData.cpc * 100) / 100 : undefined,
        difficulty: keywordData.competition ? Math.round(keywordData.competition) : undefined,
        chosen_match_type: matchType,
        target_page: targetPage,
        notes: `Auto-researched via DataForSEO API`,
      })
    }
  }

  return results
}

/**
 * Write results to CSV file
 */
function writeCSV(results: KeywordResult[], outputPath: string): void {
  const headers = [
    'keyword',
    'intent_type',
    'volume',
    'cpc_estimate',
    'difficulty',
    'chosen_match_type',
    'target_page',
    'notes',
  ]

  const rows = results.map((result) => [
    result.keyword,
    result.intent_type,
    result.volume.toString(),
    result.cpc_estimate?.toString() || '',
    result.difficulty?.toString() || '',
    result.chosen_match_type,
    result.target_page,
    result.notes,
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')
    ),
  ].join('\n')

  fs.writeFileSync(outputPath, csvContent, 'utf-8')
  console.log(`\n✅ Results written to ${outputPath}`)
  console.log(`   Total keywords: ${results.length}`)
}

/**
 * Main execution function
 */
async function main() {
  console.log('🔍 DataForSEO Keyword Research Script\n')

  // Load credentials
  let credentials: { username: string; password: string }
  try {
    credentials = loadEnv()
    console.log('✅ Credentials loaded from .env.local')
  } catch (error) {
    console.error('❌ Error loading credentials:', error instanceof Error ? error.message : error)
    process.exit(1)
  }

  // Seed keywords for research
  // These are starting points - the API will return related keywords
  const seedKeywords = [
    'dubai company formation',
    'dubai free zone',
    'uae company setup',
    'dubai business license',
    'dubai company registration',
    'dubai company formation cost',
    'dubai free zone company',
    'dubai mainland company',
    'dubai trade license',
    'dubai company formation services',
  ]

  console.log(`\n📝 Researching ${seedKeywords.length} seed keywords...`)
  console.log('   Seed keywords:', seedKeywords.join(', '))

  try {
    // Step 1: Post tasks to DataForSEO API
    console.log('\n📤 Posting tasks to DataForSEO API...')
    const taskResponse = await fetchKeywordData(
      seedKeywords,
      credentials.username,
      credentials.password
    )

    if (!taskResponse.tasks || taskResponse.tasks.length === 0) {
      throw new Error('No tasks created. Check API response.')
    }

    console.log(`✅ Created ${taskResponse.tasks.length} tasks`)
    
    // Extract task IDs
    const taskIds = taskResponse.tasks
      .filter((task) => task.status_code === 20000)
      .map((task) => task.id)

    if (taskIds.length === 0) {
      throw new Error('No successful tasks created.')
    }

    console.log(`\n⏳ Waiting for tasks to complete (this may take 30-60 seconds)...`)
    
    // Step 2: Wait a bit for tasks to process
    await new Promise((resolve) => setTimeout(resolve, 5000))

    // Step 3: Get task results
    console.log('📥 Retrieving task results...')
    const resultsResponse = await getTaskResults(
      taskIds,
      credentials.username,
      credentials.password
    )

    // Step 4: Convert to CSV format
    console.log('📊 Processing results...')
    const csvResults = convertToCSVRows(resultsResponse, seedKeywords)

    if (csvResults.length === 0) {
      console.warn('⚠️  No keyword results found. Check API response or try different seed keywords.')
      return
    }

    // Step 5: Write to CSV
    const outputPath = path.join(process.cwd(), 'seo', 'keyword-research-dataforseo-output.csv')
    writeCSV(csvResults, outputPath)

    console.log('\n✨ Keyword research complete!')
    console.log('\n📋 Next steps:')
    console.log('   1. Review the output CSV file')
    console.log('   2. Merge relevant keywords into seo/keyword-research.csv')
    console.log('   3. Update intent_type and target_page as needed')
    console.log('   4. Add notes for content planning')

  } catch (error) {
    console.error('\n❌ Error during keyword research:', error instanceof Error ? error.message : error)
    if (error instanceof Error && error.stack) {
      console.error('\nStack trace:', error.stack)
    }
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}

export { main, loadEnv, fetchKeywordData, getTaskResults, convertToCSVRows }
