# Quote API Endpoint

## Endpoint

`POST /api/quote`

## Description

Accepts an Enquiry object and returns a DecisionResult with quotes, recommendations, and pricing breakdowns.

## Request Body

The request body must be a valid JSON `Enquiry` object. See `src/domain/formation/decisionEngine/types.ts` for the complete type definition.

### Example Request

```json
{
  "priorities": {
    "primary": "cheapest"
  },
  "jurisdiction_preference": "recommend_for_me",
  "work_location": "remote_only",
  "business_category": "service",
  "business_model_description": "Digital marketing consultancy",
  "num_shareholders": 1,
  "shareholders": [
    {
      "id": "sh-1",
      "name": "John Doe",
      "nationality": "GB",
      "ownership_percent": 100,
      "has_visited_uae": false,
      "requires_visa": true,
      "visa_role": "director"
    }
  ],
  "total_visas_requested": 1,
  "visas": [
    {
      "assigned_to_shareholder_id": "sh-1",
      "role": "director"
    }
  ],
  "express_preference": "standard",
  "special_activity_flags": {
    "commodities": false,
    "crypto": false,
    "real_estate_brokerage": false,
    "financial_services": false,
    "industrial_or_manufacturing": false
  }
}
```

## Response

### Success Response (200)

Returns a `DecisionResult` object containing:

- `enquiry_id`: Unique identifier for this enquiry
- `case_status`: One of `QUOTED`, `ON_HOLD_UID_REQUIRED`, or `ON_HOLD_APPROVALS`
- `status_reasons`: Array of strings explaining the case status
- `recommendations`: Object with `primary_authority_id` and `alternatives` array
- `quotes`: Array of `AuthorityQuote` objects (up to 3) with detailed pricing
- `cta`: Configuration for call-to-action buttons

### Error Responses

#### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Internal server error while processing quote"
}
```

## Validation

The API validates:
- All required fields are present
- Field types match expected types
- Enum values are valid
- Shareholder ownership percentages sum to 100%
- Shareholder and visa arrays match their count fields
- Business logic constraints (e.g., visa_role required when requires_visa is true)

## Usage Example

```typescript
const response = await fetch('/api/quote', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(enquiry),
})

if (!response.ok) {
  const error = await response.json()
  console.error('Error:', error.error)
  return
}

const result = await response.json()
console.log('Recommended authority:', result.recommendations.primary_authority_id)
console.log('Total cost:', result.quotes[0].total_cost, 'AED')
```

