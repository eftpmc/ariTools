# Anime Search API Documentation

## Endpoint

- **URL**: `/anime/search/:keyword`
- **Method**: `GET`

## Parameters

- `keyword` (string) - The keyword or query to search for anime. It is part of the URL.

## Response

The response is a JSON array of objects where each object contains information about an anime that matches the search criteria.

### Response Object Properties

- `title` (string) - The title of the anime.
- `img` (string) - The URL to the poster image of the anime.
- `url` (string) - The URL to the anime's page on the source website.
- `id` (string) - The unique identifier for the anime.

## Example

### Request

```
GET /anime/search/naruto
```

### Response

```
json
[
  {
    "title": "Naruto",
    "img": "https://example.com/poster.jpg",
    "url": "https://gogoanime.hu/anime/naruto-1234",
    "id": "1234"
  }
]
```

## Error Handling

If there is an error in processing the request, such as an issue with the API_URL or if the server encounters any other error, the API should return an error response with HTTP status code 500.

### Example Error Response

```
json
{
    "error": "An error occurred while fetching search results"
}
```

This error response indicates that there was a server-side error while processing the request. It is important to handle errors gracefully and provide meaningful error messages to the client.
