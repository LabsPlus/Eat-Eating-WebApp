const useRfid = {
  async getDeviceStatus() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_RFID}/deviceIsConnected`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  async postData(endpoint: string, data: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_RFID}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },
};

export default useRfid;
