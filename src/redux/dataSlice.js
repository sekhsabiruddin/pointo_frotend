import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../sever";
import axios from "axios";
// const SERVER_URL = "http://localhost:8080/";
const initialState = {
  notes: [],
  searchNote: [],
  status: "idle",
  error: null,
  loading: false,
};

export const getAllNotes = createAsyncThunk(
  "notes/getAllNotes",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Api url ", `${SERVER_URL}api/notes`);
      const response = await axios.get(`${SERVER_URL}/api/notes`);
      console.log("Api reponse ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notes"
      );
    }
  }
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  async (newNoteData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/notes`, newNoteData);
      // console.log("createNote:->", response.data.note);
      return response.data.note;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create note"
      );
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${SERVER_URL}/api/notes/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete note"
      );
    }
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, title, content }, { rejectWithValue }) => {
    // console.log("id...", id, "title", title, "content", content);
    try {
      const response = await axios.put(`${SERVER_URL}/api/notes/${id}`, {
        id,
        title,
        content,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update note"
      );
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    searchTheNote(state, action) {
      const searchTerm = action.payload.toLowerCase();
      const filteredNotes = state.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm) ||
          note.content.toLowerCase().includes(searchTerm)
      );
      state.searchNote = filteredNotes;
      state.isSearch = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllNotes.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
        state.loading = false;
      })
      .addCase(getAllNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
        state.loading = false;
      });

    builder
      .addCase(createNote.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes.push(action.payload);
        state.loading = false;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create note";
        state.loading = false;
      });

    builder
      .addCase(deleteNote.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = state.notes.filter(
          (note) => note.id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete note";
        state.loading = false;
      });

    builder
      .addCase(updateNote.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.status = "succeeded";

        const index = state.notes.findIndex(
          (note) => note.id === action.payload.id
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update note";
        state.loading = false;
      });
  },
});
export const { searchTheNote } = notesSlice.actions;
export default notesSlice.reducer;
