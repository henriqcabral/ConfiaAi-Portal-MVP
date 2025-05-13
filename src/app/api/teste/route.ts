export async function GET() {
  return new Response(JSON.stringify({ teste: "True" }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}