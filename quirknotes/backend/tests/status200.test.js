const SERVER_URL = "http://localhost:4000";

// Helper function to make HOT AND READ(y)ABLE code
async function postNote(a) {
	const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: a,
			content: a,
		}),
	});
	const postNoteBody = await postNoteRes.json();

	return postNoteBody
	
}

// Clear all notes before each test
beforeEach(async () => {
	const res = await fetch(`http://localhost:4000/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
      })
  });

test("/postNote - Post a note", async () => {
	const title = "NoteTitleTest";
	const content = "NoteTitleContent";
	const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: title,
			content: content,
		}),
	});

	const postNoteBody = await postNoteRes.json();

	expect(postNoteRes.status).toBe(200);
	expect(postNoteBody.response).toBe("Note added succesfully.");
});


test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
	const res = await fetch("http://localhost:4000/getAllNotes")
	const data = await res.json();

	expect(res.status).toBe(200);
	expect(data.response.length).toBe(0);
	});
  
test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
	await postNote("i like");
	await postNote("emily");

	const res = await fetch("http://localhost:4000/getAllNotes")
	const data = await res.json();

	expect(res.status).toBe(200);
	expect(data.response.length).toBe(2);
  });
  
  test("/deleteNote - Delete a note", async () => {
	postNoteBody = await postNote("YES, I AM AWARE.");
	const res = await fetch(`http://localhost:4000/deleteNote/${postNoteBody.insertedId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
      });

	const data = await res.json();
	expect(res.status).toBe(200);
	expect(data.response).toBe(`Document with ID ${postNoteBody.insertedId} deleted.`);
  });
  
  test("/patchNote - Patch with content and title", async () => {
	const note = await postNote("FROG TOASTERS");
	const title = "OOOGA";
	const content = "BOOGA";

	const response = await fetch(`http://localhost:4000/patchNote/${note.insertedId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodeId: note.insertedId, title, content}),
      });
  
	const data = await response.json();

	expect(response.status).toBe(200);
	expect(data.response).toBe(`Document with ID ${note.insertedId} patched.`);
  });
  
  test("/patchNote - Patch with just title", async () => {
	const note = await postNote("WHY DID SHE LEAVE ME");
	const title = "OOOGA";

	const response = await fetch(`http://localhost:4000/patchNote/${note.insertedId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodeId: note.insertedId, title}),
      });
  
	const data = await response.json();

	expect(response.status).toBe(200);
	expect(data.response).toBe(`Document with ID ${note.insertedId} patched.`);
  });
  
  test("/patchNote - Patch with just content", async () => {
	const note = await postNote("SUPPOSE I ACTUALLY CARED...");
	const content = "BOOGA";

	const response = await fetch(`http://localhost:4000/patchNote/${note.insertedId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodeId: note.insertedId, content}),
      });
  
	const data = await response.json();

	expect(response.status).toBe(200);
	expect(data.response).toBe(`Document with ID ${note.insertedId} patched.`);
  });
  
  test("/deleteAllNotes - Delete one note", async () => {
	await postNote("AND THEN LET ME TELL YOU.");

	const res = await fetch(`http://localhost:4000/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
      })

	const data = await res.json();
	expect(res.status).toBe(200);
	expect(data.response).toBe("1 note(s) deleted.")
  });
  
  test("/deleteAllNotes - Delete three notes", async () => {
	await postNote("donate");
	await postNote("your");
	await postNote("organs");

	const res = await fetch(`http://localhost:4000/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
      })

	const data = await res.json();
	expect(res.status).toBe(200);
	expect(data.response).toBe("3 note(s) deleted.")
  });
  
  test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
	note = await postNote("owo");
	const color = "#FF0000";

	const response = await fetch(`http://localhost:4000/updateNoteColor/${note.insertedId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ color }),
	});

	const data = await response.json();
	expect(response.status).toBe(200);
	expect(data.message).toBe('Note color updated successfully.');

  });