const token = process.env.PINTEREST_ACCESS_TOKEN;

export const getBoards = async () => {
  const url = "https://api.pinterest.com/v5/boards";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching boards:", error);
    throw error;
  }
};

export const getPins = async (boardId: string) => {
  const url = `https://api.pinterest.com/v5/boards/${boardId}/pins`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching pins:", error);
    throw error;
  }
};
