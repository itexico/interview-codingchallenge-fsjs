## CRUD Operations in the API
### Get all notes
`GET http://localhost:3000/notes`

### Create a note
`POST http://localhost:3000/notes`
and with JSON body request as the example bellow:
```
{
  "title": "Languages",
  "items": ["English", "Japanese","Chinese"]
}
```
you can omit the items field, but title field is required.

### Get a specific note
`GET http://localhost:3000/notes/:noteId`
where `:noteId` is a valid ID for an already stored note.

### Update a specific note
`PATCH http://localhost:3000/notes/:noteId`
where `:noteId` is a valid ID for an already stored note
and with JSON body request as the example bellow:
```
{
  "title": "Favorite Languages",
  "items": ["English", "Chinese"]
}
```
you can omit any field.

### Remove a specific note
`DEL http://localhost:3000/notes/:noteId`
where `:noteId` is a valid ID for an already stored note.

### Get all entries from a note
`GET http://localhost:3000/notes/:noteId/entries`
where `:noteId` is a valid ID for an already stored note.

### Create a new entry in a note
`POST http://localhost:3000/notes/:noteId/entries`
where `:noteId` is a valid ID for an already stored note
and with JSON body request as the example bellow:
```
{
  "item": "Spanish"
}
```

### Get a specific entry from a note
`GET http://localhost:3000/notes/:noteId/entries/:entryIndex`
where `:noteId` is a valid ID for an already stored note and `:entryIndex` is a valid index (0, 1, 2...) for an existing entry 
in the note.

### Update a specific entry in a note
`PATCH http://localhost:3000/notes/:noteId/entries/:entryIndex`
where `:noteId` is a valid ID for an already stored note and `:entryIndex` is a valid index (0, 1, 2...) for an existing entry 
in the note and with JSON body request as the example bellow:
```
{
  "item": "Spanish"
}
```
### Remove a specific entry from a note
`DEL http://localhost:3000/notes/:noteId/entries/:entryIndex`
where `:noteId` is a valid ID for an already stored note and `:entryIndex` is a valid index (0, 1, 2...) for an existing entry 
in the note.


