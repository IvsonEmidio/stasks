import { TaskObject } from "../interfaces";
import { fakeData } from "./data";
import axios from "axios";
//Change the value below if you have a backend ready.
const backEndUBaseUrl = "http://127.0.0.1:8000/api/";

const api = axios.create({
  timeout: 7000,
  baseURL: backEndUBaseUrl,
});

/**
 * Creates a new task on database
 */
export async function createTask(data: TaskObject) {
  try {
    let request = await api.post(backEndUBaseUrl + "tasks", {
      title: data.title,
      note: data.note,
      date: data.date,
      time: data.time,
    });
    if (request) {
      let { status } = request.data;
      if (status === 1) {
        return true;
      }
    }
    return false;
  } catch (err) {
    return false;
  }
}

/**
 * Get all tasks in database.
 */
export async function getTasks() {
  //Comment this line below if you have a backend ready.
  return fakeData;
  try {
    let request = await api.get(backEndUBaseUrl + "tasks");
    if (request) {
      let { status, data } = request.data;
      if (status === 1) {
        return data;
      }
    }
    return false;
  } catch (err) {
    return false;
  }
}

/**
 * Updates an task in database
 */
export async function updateTask(data: TaskObject) {
  try {
    let request = await api.put(backEndUBaseUrl + "tasks", {
      id: data.id,
      title: data.title,
      note: data.note,
      date: data.date,
      time: data.time,
    });
    if (request) {
      let { status } = request.data;
      if (status === 1) {
        return true;
      }
    }
    return false;
  } catch (err) {
    return false;
  }
}

/**
 * Cancel an task in database.
 */
export async function cancelTask(id: Number) {
  try {
    let request = await api.delete(backEndUBaseUrl + "tasks/?id=" + id);
    if (request) {
      return request.data;
    }
    return false;
  } catch (err) {
    return false;
  }
}
