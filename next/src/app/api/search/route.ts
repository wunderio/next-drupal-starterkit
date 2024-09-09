import { NextRequest, NextResponse } from "next/server";
import API from "@searchkit/api";

import { env } from "@/env";

const apiClient = API({
  connection: {
    host: `http://${env.ES_HOST}:9200`,
  },
  search_settings: {
    highlight_attributes: ["title"],
    snippet_attributes: ["excerpt:200"],
    search_attributes: [
      { field: "title", weight: 3 },
      { field: "excerpt", weight: 2 },
      "body",
    ],
    result_attributes: ["title", "body", "excerpt", "path"],
    facet_attributes: [
      {
        attribute: "content_type",
        field: "content_type",
        type: "string",
      },
      {
        attribute: "tags",
        field: "tags",
        type: "string",
      },
    ],
    query_rules: [
      {
        id: "default-state",
        conditions: [[]],
        actions: [
          {
            action: "RenderFacetsOrder",
            facetAttributesOrder: ["content_type", "tags"],
          },
        ],
      },
    ],
  },
});

export async function POST(req: NextRequest, _res: NextResponse) {
  const data = await req.json();

  const results = await apiClient.handleRequest(data);
  return NextResponse.json(results);
}
