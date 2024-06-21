const token = process.env.PINTEREST_ACCESS_TOKEN;
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const boardId = searchParams.get("boardId");
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

    return Response.json(data);
  } catch (error) {
    console.error("Error fetching pins:", error);
    throw error;
  }
}
