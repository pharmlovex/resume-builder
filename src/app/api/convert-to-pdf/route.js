import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the request body
    const { html, fileName } = await request.json();

    // For server-side PDF generation, we'll return the HTML and let the client handle conversion
    // This is because html2pdf.js works better in the browser environment

    return NextResponse.json({
      html,
      fileName,
      message: "HTML content ready for PDF conversion",
    });
  } catch (error) {
    console.error("Error preparing for PDF conversion:", error);
    return NextResponse.json(
      { message: "Failed to prepare for PDF conversion: " + error.message },
      { status: 500 }
    );
  }
}
