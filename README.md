# Dealer Evaluation

Option A for the IBM microservices project. The Python product service lists products and their dealers. The Node.js pricing service returns single-dealer and all-dealer prices. The frontend compares the offers using both services.

## Deploy on IBM Code Engine

In a Code Engine project with build access, create three public applications from this repository, using the Dockerfile strategy and port 8080. For the frontend, set both environment variables to the public HTTPS base URLs of the deployed APIs.

| Application | Source context directory | Configuration |
| --- | --- | --- |
| product-details | `products` | Default port 8080 |
| dealer-pricing | `pricing` | Default port 8080 |
| dealer-evaluation | Repository root | `PRODUCT_API_URL` and `DEALER_API_URL` |

The template `html/index.html` renders the configured API URLs into the HTML. For the grading screenshot of the source with literal deployment URLs, replace the two template expressions with the actual HTTPS URLs after the backend deployments are ready.

## Verify

The GitHub Actions workflow runs all three services and checks the dropdowns and prices in Chromium. It also performs a real clone of the IBM frontend starter and captures a terminal screenshot. The Code Engine deployment and browser screenshots are separate grading evidence.

Starter repositories: [frontend](https://github.com/ibm-developer-skills-network/dealer_evaluation_frontend) and [backend](https://github.com/ibm-developer-skills-network/dealer_evaluation_backend).
