# Get Anime Episode Source API Documentation

## Endpoint

- **URL**: `/anime/episode/:id/:ep`
- **Method**: `GET`

## Parameters

- `id` (string) - The unique identifier for the anime.
- `ep` (integer) - The episode number.

## Response

The response is a JSON object containing two properties `subSource` and `dubSource`, which are both arrays containing information about the sources of the subbed and dubbed versions of the episode, respectively.

### Response Object Properties

For `subSource` and `dubSource`:

- `file` (string) - The URL of the video file.
- `label` (string) - The resolution label of the video (e.g., "720p", "1080p").

## Example

### Request

```
GET /anime/episode/1234/1
```

### Response

```
json
{
  "subSource": [
    {
      "file": "https://example.com/video.mp4",
      "type": "hls"
    }
  ],
  "dubSource": null
}
```

## Error Handling

If there is an error in processing the request, such as a missing or invalid ID or episode number, or if the server encounters any other error, the API should return an error response with HTTP status code 500.

### Example Error Response

```
json
{
    "error": "An error occurred while fetching episode links"
}
```

This error response indicates that there was a server-side error while processing the request. It is important to handle errors gracefully and provide meaningful error messages to the client.
