# Movie Search API Documentation

## Endpoint

- **URL**: `/search/:keyword`
- **Method**: `GET`

## Parameters

- `keyword` (string) - The keyword or query to search for movies. It is part of the URL.

## Response

The response is a JSON array of objects where each object contains information about a movie that matches the search criteria.

### Response Object Properties

- `title` (string) - The title of the movie.
- `img` (string) - The URL to the poster image of the movie.
- `url` (string) - The URL to the movie's page on the source website.
- `id` (string) - The unique identifier for the movie.

## Example

### Request

```http
GET /search/avengers
```

### Response

```json
[
  {
    "title": "The Avengers",
    "img": "https://example.com/poster.jpg",
    "url": "https://flixhq.to/movies/the-avengers-1234",
    "id": "1234"
  }
]
```

## Error Handling

If there is an error in processing the request, such as an issue with the API_URL or if the server encounters any other error, the API should return an error response with HTTP status code 500.

### Example Error Response

```json
{
    "error": "An error occurred while fetching search results"
}
```

This error response indicates that there was a server-side error while processing the request. It is important to handle errors gracefully and provide meaningful error messages to the client.
