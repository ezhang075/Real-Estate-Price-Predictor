# Backend

- To deploy this backend to Vercel, follow these steps:

1. Create a `vercel.json` file in the `backend` directory with the following content:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/run.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "backend/run.py"
    }
  ]
}