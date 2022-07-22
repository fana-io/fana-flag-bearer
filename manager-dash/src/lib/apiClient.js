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
  editAudience: async (id, updatedFields) => {
    let { data } = await axios.patch('/api/audiences/' + id, updatedFields);
    console.log(data);
    return data;
  },
  getAttributes: async () => {
    let { data } = await axios.get('/api/attributes');
    return data;
  },
  getAttribute: async (id) => {
    let { data } = await axios.get(`/api/attributes/${id}`);
    return data;
  },
  createAttribute: async (newAttr) => {
    let { data } = await axios.post(`/api/attributes/`, newAttr)
    return data
    
  },
  deleteAttribute: async (id) => {
    let { data } = await axios.delete(`/api/attributes/${id}`)
    return data
  }
}

export default apiClient;