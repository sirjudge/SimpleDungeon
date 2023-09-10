
const server = Bun.serve({
  port: 3000,
  fetch(request) {
      //return new Response("Welcome to Bun!");
      const url = new URL(request.url);
      console.log(url);
      if (url. pathname === "/") {
        return new Response(Bun.file(import.meta.dir + "/pages/home.html"));
      }
      return new Response("Not found", { status: 404 });
  },
});

console.log("Bun is running on http://localhost:3000" );

// <script src="https://unpkg.com/htmx.org@1.9.5" integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO" crossorigin="anonymous"></script>
