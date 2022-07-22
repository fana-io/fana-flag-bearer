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
    return data;
  },
  toggleFlag: async (id, newStatusObj) => {
    await axios.patch(`/api/flags/${id}/toggle`, newStatusObj)
  },
  editFlag: async (id, updatedFields) => {
    let { data } = await axios.patch('/api/flags/' + id, updatedFields);
    return data;
  },
  deleteFlag: async (id) => {
    let { data } = await axios.delete('/api/flags/' + id);
    return data;
  },
  getAudiences: async () => {
    let { data } = await axios.get('/api/audiences');
    return data;
  },
  getAudience: async(id) => {
    let { data } = await axios.get(`/api/audiences/${id}`);
    return data;
  },
  createAudience: async (newAudience) => {
    let { data } = await axios.post('/api/audiences', newAudience);
    return data;
  },
  editAudience: async (id, updatedFields) => {
    let { data } = await axios.patch('/api/audiences/' + id, updatedFields);
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
    let { data } = await axios.post(`/api/attributes`, newAttr)
    return data
  },
  deleteAttribute: async (id) => {
    let { data } = await axios.delete(`/api/attributes/${id}`)
    return data
  },
  getLogs: async () => {
    // let { data } = await axios.get(`/api/auditLogs`);
    let data = {
      flags: [
        {
          createdAt: new Date('December 17, 1995 03:24:00'),
          id: 1,
          key: 'beta-header',
          action: 'Created'
        },
        {
          createdAt: new Date('December 18, 1995 03:24:00'),
          id: 1,
          key: 'beta-header',
          action: 'Toggled on'
        },
        {
          createdAt: new Date('December 17, 1995 05:24:00'),
          id: 2,
          key: 'beta-processor',
          action: 'Created'
        }
      ],
      audiences: [
        {
          createdAt: new Date('December 17, 1994 03:24:00'),
          id: 1,
          key: 'beta-testers',
          action: 'Created'
        },
        {
          createdAt: new Date('December 17, 1999 03:24:00'),
          id: 1,
          key: 'beta-testers',
          action: 'Conditions updated'
        }
      ], 
      attributes: [
        {
          createdAt: new Date('March 17, 1995 03:24:00'),
          id: 1,
          key: 'beta',
          action: 'Created'
        }
      ]
    }
    return data;
  }
}

export default apiClient;