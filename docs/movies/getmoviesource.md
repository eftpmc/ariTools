# Get Movie Source API Documentation

## Endpoint
- **URL**: `/api/movie/:id`
- **Method**: `GET`

## Parameters
- `id` (string) - The ID of the movie for which you want to retrieve the source data. It is part of the URL.

## Response
The response is a JSON object that contains the `m3u8Data` property, which includes an array of video sources and subtitles.

### Response Object Properties
- `m3u8Data` (object)
  - `sources` (array)
    - `url` (string) - The URL of the video source.
    - `quality` (string) - The quality of the video source (e.g., "720" for 720p).
    - `isM3U8` (boolean) - A boolean indicating if the source is in m3u8 format.
  - `subtitles` (array)
    - `url` (string) - The URL of the subtitle track.
    - `lang` (string) - The language of the subtitle.

## Example

### Request
```http
GET /api/movie/12345
```

### Response
```json
{
    "m3u8Data": {
        "sources": [
            {
                "url": "https://example.com/source.m3u8",
                "quality": "720",
                "isM3U8": true
            }
        ],
        "subtitles": [
            {
                "url": "https://example.com/subtitle.vtt",
                "lang": "English"
            }
        ]
    }
}
```

## Error Handling
If the movie ID is invalid, not provided, or if there is an error in processing the request, the API should return an error response with the appropriate HTTP status code.

### Example Error Response
```json
{
    "error": "Invalid movie ID provided."
}
```

This error response indicates that the movie ID provided is invalid. It is important to handle errors gracefully and provide meaningful error messages to the client.
