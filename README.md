# 🧇 **Waffle**  
**Simplify API interactions in JavaScript/TypeScript**  
*A lightweight wrapper for the `fetch()` API with streamlined response handling.*

---

## **Overview**
### **What is Waffle?**
Waffle is a JavaScript/TypeScript package that simplifies interactions with external APIs. It provides:
- A clean syntax for reusable API clients (`Waffle` class).
- One-off request utilities (`QuickWaffle`).
- Consistent response handling with `WaffleResponse`.

### **Key Features**
- Eliminates promise chains with `async/await` syntax.
- Built-in methods for common HTTP verbs (GET, POST, etc.).
- Unified response format for easy data access.

---

## **Usage Guide**

### **1. The `Waffle` Class**  
Create reusable API clients with a base URL and default headers.

#### **Constructor**
```typescript
new Waffle(baseUrl: string, headers?: Headers)
```
- `baseUrl`: Base endpoint for all requests (e.g., `https://api.example.com`).
- `headers`: Default headers (optional).

#### **Methods**
```typescript
Get(endpoint: string, additionalHeaders?: Headers): WaffleResponse
Post(endpoint: string, body: any, additionalHeaders?: Headers): WaffleResponse
Update(endpoint: string, body: any, additionalHeaders?: Headers): WaffleResponse
Delete(endpoint: string, body: any, additionalHeaders?: Headers): WaffleResponse
```

**Example**  
```typescript
const api = new Waffle("https://api.example.com", new Headers({ Authorization: "TOKEN" }));
const users = await api.Get("/users"); 
console.log(users.json()); // Parsed JSON data
```

---

### **2. `QuickWaffle`**  
Make one-off requests without creating a client instance.

#### **Static Methods**
```typescript
QuickWaffle.Get(url: string, headers?: Headers): WaffleResponse
QuickWaffle.Post(url: string, body: any, headers?: Headers): WaffleResponse
// ...and other HTTP methods
```

**Example**  
```typescript
const response = await QuickWaffle.Get(
  "https://api.weather.com/forecast", 
  new Headers({ "API-Key": "123" })
);
```

---

### **3. `WaffleResponse`**  
Standardized response object with easy data access.

#### **Properties**
| Property       | Description                          |
|----------------|--------------------------------------|
| `code`         | HTTP status code (e.g., 200, 404)    |
| `body`         | Raw response body                    |
| `statusText`   | HTTP status text (e.g., "OK", "Not Found") |
| `contentType`  | Response content type (e.g., "application/json") |
| `headers`      | Response headers                     |

#### **Methods**
```typescript
json(): any  // Parses `body` as JSON (throws error if not JSON)
```

**Example**  
```typescript
const response = await api.Get("/data");
if (response.code === 200) {
  const data = response.json(); // Access parsed data
}
```

---

## **Why Use Waffle?**
- **No More `.then()` Chains**: Uses modern `async/await` syntax.
- **DRY Code**: Reuse base configurations with the `Waffle` class.
- **TypeScript Support**: Built with type safety in mind.
- **Lightweight**: Minimal overhead over native `fetch()`.