sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user types a note and clicks "Save"
    Note right of browser: JavaScript adds the new note to the local list and rerenders the UI

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: Server saves the note to the database
    server-->>browser: HTTP 201 Created (JSON: {"message":"note created"})
    deactivate server