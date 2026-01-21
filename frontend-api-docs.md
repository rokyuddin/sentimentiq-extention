# Frontend API Documentation for SentimentIQ Backend

This document provides guidance on how to call the SentimentIQ backend APIs from a frontend application. The backend is built with Hono and provides endpoints for sentiment analysis of products.

## Base URL

Assume the backend is deployed at `https://api.sentimentiq.com`. Replace with your actual backend URL.

## Authentication

- For anonymous users: Use `userSessionId` in the request body (e.g., a UUID generated on the client).
- For authenticated users: Include an Authorization header with a Bearer token obtained from login.

## API Endpoints

### 1. Analyze Product

**Endpoint**: `POST /api/analyze`

Analyzes the sentiment of a product based on public discussions and reviews.

#### Request

- **Method**: POST
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>` (optional, for authenticated users)
- **Body** (JSON):

  ```json
  {
    "product": {
      "url": "https://example.com/product",
      "name": "Product Name",
      "brand": "Brand Name"
    },
    "userSessionId": "anon_1234567890"
  }
  ```

  - `product.url`: Required. The product URL.
  - `product.name`: Optional. Product name.
  - `product.brand`: Optional. Brand name.
  - `userSessionId`: Required for anonymous users. A unique session ID.

#### Response

- **Success (200)**:

  ```json
  {
    "bs_score": 75,
    "trust_level": "high",
    "summary": "Overall positive sentiment with some concerns about durability.",
    "pros": ["High quality", "Good value"],
    "cons": ["Heavy weight", "Expensive"],
    "sentimentData": {
      /* optional raw data */
    }
  }
  ```

  - `bsScore`: Integer 0-100 indicating sentiment score.
  - `trustLevel`: "high", "medium", or "low".
  - `summary`: AI-generated summary.
  - `pros`: Array of strings.
  - `cons`: Array of strings.
  - `sentimentData`: Optional JSON object with raw breakdown.

- **Errors**:
  - **402 Payment Required**: Quota exceeded for free users. Upgrade to Pro.
  - **429 Too Many Requests**: Rate limit exceeded.
  - **400 Bad Request**: Invalid request data.
  - **500 Internal Server Error**: Server error.

#### Example (JavaScript with fetch)

```javascript
const analyzeProduct = async (
  productUrl,
  productName,
  brand,
  sessionId,
  token = null,
) => {
  const url = "http://localhost:8080/api/analyze";
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const body = {
    product: {
      url: productUrl,
      name: productName,
      brand: brand,
    },
    userSessionId: sessionId,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (response.status === 402) {
        throw new Error("Quota exceeded. Please upgrade to Pro.");
      } else if (response.status === 429) {
        throw new Error("Rate limit exceeded. Try again later.");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const data = await response.json();
    console.log("Analysis result:", data);
    return data;
  } catch (error) {
    console.error("Error analyzing product:", error);
    throw error;
  }
};

// Usage example
analyzeProduct(
  "https://example.com/product",
  "Example Product",
  "Example Brand",
  "anon_1234567890",
);
```

#### Example (cURL)

```bash
curl -X POST http://localhost:8080/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "product": {
      "url": "https://example.com/product",
      "name": "Example Product",
      "brand": "Example Brand"
    },
    "userSessionId": "anon_1234567890"
  }'
```

For authenticated users, add the Authorization header:

```bash
curl -X POST http://localhost:8080/api/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "product": {
      "url": "https://example.com/product",
      "name": "Example Product",
      "brand": "Example Brand"
    },
    "userSessionId": "anon_1234567890"
  }'
```

### 2. Upgrade to Pro (Subscription Checkout)

**Endpoint**: `POST /api/subscription/checkout`

Initiates a payment checkout session for upgrading to Pro tier.

#### Request

- **Method**: POST
- **Headers**:
  - `Authorization: Bearer <token>` (required)
- **Body**: May include payment details or be empty depending on implementation.

#### Response

- Redirect to Stripe checkout or return session URL.

This endpoint is typically handled by redirecting the user to a payment page, not directly returning data to the frontend.

## Notes

- Ensure CORS is configured on the backend if calling from a different domain.
- Handle network errors and retries appropriately.
- For production, use HTTPS and secure token storage.
