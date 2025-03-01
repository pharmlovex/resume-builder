import { NextResponse } from "next/server";
import HTMLtoDOCX from "html-to-docx";

export async function POST(request) {
  try {
    // Parse the request body
    const { html, fileName } = await request.json();

    // Convert HTML to DOCX
    const buffer = await HTMLtoDOCX(html, null, {
      title: fileName,
      margin: {
        top: 1440,
        right: 1440,
        bottom: 1440,
        left: 1440,
      },
    });

    // Return the DOCX file as a response
    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("Error converting to DOCX:", error);
    return NextResponse.json(
      { message: "Failed to convert to DOCX: " + error.message },
      { status: 500 }
    );
  }
}
