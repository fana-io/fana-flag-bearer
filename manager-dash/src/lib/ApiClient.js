import axios from 'axios';

const apiClient = {
  getFlags: async () => {
    let { data } = await axios.get('/api/flags');
    return data;
  },
  getFlag: async (id) => {
    let { data } = await axios.get(`/api/flags/${id}`);
    return data;
  },
  createFlag: async (newFlag) => {
    let { data } = await axios.post(`/api/flags`, newFlag);
    console.log(data);
    return data;
  },
  toggleFlag: async (id, newStatusObj) => {
    await axios.patch(`/api/flags/${id}/toggle`, newStatusObj)
  },
  editFlag: async (id, updatedFields) => {
    let { data } = await axios.patch('/api/flags/' + id, updatedFields);
    console.log(data);
    return data;
  },
  deleteFlag: async () => {

  },
  getAudiences: async () => {
    let { data } = await axios.get('/api/audiences');
    return data;
  },
  getAudience: async(id) => {
    let { data } = await axios.get(`/api/audiences/${id}`);
    return data;
  },
  createAudience: async () => {

  },
  editAudience: async () => {

  },
  getAttributes: async () => {
    let { data } = await axios.get('/api/attributes');
    return data;
  },
  createAttribute: async () => {

  }
}

export default apiClient;