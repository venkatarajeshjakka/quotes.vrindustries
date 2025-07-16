"use client";

import { useQuotation } from "@/contexts/quotation-context";
import { Button } from "@/components/ui/button";

import ReactMarkdown from "react-markdown";
import { marked } from "marked";
import { ArrowLeft, Download, Printer } from "lucide-react";

export default function QuotationPreview() {
  const { state, dispatch } = useQuotation();

  const handleBack = () => {
    dispatch({ type: "TOGGLE_PREVIEW" });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    try {
      // Dynamic import to avoid SSR issues
      const jsPDF = (await import("jspdf")).default;

      // Create new PDF document
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;

      // Helper function to add text with word wrap and return new Y position
      const addText = (
        text: string,
        x: number,
        y: number,
        maxWidth?: number,
        fontSize = 10,
        isBold = false
      ) => {
        pdf.setFontSize(fontSize);
        pdf.setFont("", isBold ? "bold" : "normal");

        if (maxWidth) {
          const lines = pdf.splitTextToSize(text, maxWidth);
          pdf.text(lines, x, y);
          return y + lines.length * (fontSize * 0.4) + 2;
        } else {
          pdf.text(text, x, y);
          return y + fontSize * 0.4 + 2;
        }
      };

      // Add line
      const addLine = (y: number) => {
        pdf.setDrawColor(200, 200, 200);
        pdf.line(margin, y, pageWidth - margin, y);
        return y + 5;
      };

      // Header Section
      if (state.quotation.organization) {
        // Company name
        yPosition = addText(
          state.quotation.organization.name,
          margin,
          yPosition,
          undefined,
          18,
          true
        );
        yPosition += 3;

        // Company details
        yPosition = addText(
          state.quotation.organization.address,
          margin,
          yPosition,
          contentWidth * 0.6,
          9
        );
        yPosition = addText(
          `Phone: ${state.quotation.organization.phone}`,
          margin,
          yPosition,
          undefined,
          9
        );
        yPosition = addText(
          `Email: ${state.quotation.organization.email}`,
          margin,
          yPosition,
          undefined,
          9
        );

        if (state.quotation.organization.website) {
          yPosition = addText(
            `Website: ${state.quotation.organization.website}`,
            margin,
            yPosition,
            undefined,
            9
          );
        }
        if (state.quotation.organization.gstNumber) {
          yPosition = addText(
            `GST: ${state.quotation.organization.gstNumber}`,
            margin,
            yPosition,
            undefined,
            9
          );
        }

        // Quotation details on right side
        const rightX = pageWidth - 80;
        let rightY = 20;
        rightY = addText("QUOTATION", rightX, rightY, undefined, 16, true);
        rightY += 3;
        rightY = addText(
          `Quote #: ${state.quotation.quotationNumber}`,
          rightX,
          rightY,
          undefined,
          9
        );
        rightY = addText(
          `Date: ${new Date(state.quotation.date).toLocaleDateString()}`,
          rightX,
          rightY,
          undefined,
          9
        );
        rightY = addText(
          `Valid Until: ${new Date(
            state.quotation.expiryDate
          ).toLocaleDateString()}`,
          rightX,
          rightY,
          undefined,
          9
        );

        yPosition = Math.max(yPosition, rightY) + 10;
        yPosition = addLine(yPosition);
      }

      // Client Information
      if (state.quotation.client) {
        yPosition = addText("Bill To:", margin, yPosition, undefined, 12, true);
        yPosition += 3;
        yPosition = addText(
          state.quotation.client.name,
          margin,
          yPosition,
          undefined,
          10,
          true
        );
        yPosition = addText(
          state.quotation.client.company,
          margin,
          yPosition,
          undefined,
          10,
          true
        );
        yPosition = addText(
          state.quotation.client.address,
          margin,
          yPosition,
          contentWidth * 0.6,
          9
        );
        yPosition = addText(
          `Phone: ${state.quotation.client.phone}`,
          margin,
          yPosition,
          undefined,
          9
        );
        yPosition = addText(
          `Email: ${state.quotation.client.email}`,
          margin,
          yPosition,
          undefined,
          9
        );

        if (state.quotation.client.gstNumber) {
          yPosition = addText(
            `GST: ${state.quotation.client.gstNumber}`,
            margin,
            yPosition,
            undefined,
            9
          );
        }
        yPosition += 5;
      }

      // Subject
      if (state.quotation.subject) {
        yPosition = addText("Subject:", margin, yPosition, undefined, 12, true);
        yPosition += 2;
        yPosition = addText(
          state.quotation.subject,
          margin,
          yPosition,
          contentWidth,
          10
        );
        yPosition += 5;
      }

      // Products Table
      if (state.quotation.products.length > 0) {
        // Check if we need a new page
        if (yPosition > pageHeight - 80) {
          pdf.addPage();
          yPosition = 20;
        }

        yPosition = addText(
          "Product Details:",
          margin,
          yPosition,
          undefined,
          12,
          true
        );
        yPosition += 8;

        // Table configuration
        const colWidths = [15, 75, 18, 30, 32]; // S.No, Description, Qty, Rate, Amount
        const tableStartX = margin;
        const tableWidth = colWidths.reduce((sum, width) => sum + width, 0);
        const headerHeight = 10;
        const rowMinHeight = 12;

        // Draw table header
        pdf.setDrawColor(0, 0, 0);
        pdf.setFillColor(240, 240, 240);
        pdf.rect(tableStartX, yPosition - 2, tableWidth, headerHeight, "FD");

        // Header text
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        let currentX = tableStartX;

        // S.No header
        pdf.text("S.No.", currentX + 2, yPosition + 5);
        pdf.line(currentX + colWidths[0], yPosition - 2, currentX + colWidths[0], yPosition + headerHeight - 2);
        currentX += colWidths[0];

        // Description header
        pdf.text("Description", currentX + 2, yPosition + 5);
        pdf.line(currentX + colWidths[1], yPosition - 2, currentX + colWidths[1], yPosition + headerHeight - 2);
        currentX += colWidths[1];

        // Qty header (centered)
        const qtyText = "Qty";
        const qtyWidth = pdf.getTextWidth(qtyText);
        pdf.text(qtyText, currentX + (colWidths[2] - qtyWidth) / 2, yPosition + 5);
        pdf.line(currentX + colWidths[2], yPosition - 2, currentX + colWidths[2], yPosition + headerHeight - 2);
        currentX += colWidths[2];

        // Rate header (centered)
        const rateText = "Rate (₹)";
        const rateWidth = pdf.getTextWidth(rateText);
        pdf.text(rateText, currentX + (colWidths[3] - rateWidth) / 2, yPosition + 5);
        pdf.line(currentX + colWidths[3], yPosition - 2, currentX + colWidths[3], yPosition + headerHeight - 2);
        currentX += colWidths[3];

        // Amount header (centered)
        const amountText = "Amount (₹)";
        const amountWidth = pdf.getTextWidth(amountText);
        pdf.text(amountText, currentX + (colWidths[4] - amountWidth) / 2, yPosition + 5);

        yPosition += headerHeight;
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);

        // Table rows
        state.quotation.products.forEach((product, index) => {
          if (yPosition > pageHeight - 40) {
            pdf.addPage();
            yPosition = 20;
          }

          // Calculate row height based on description length
          const descLines = pdf.splitTextToSize(product.description, colWidths[1] - 4);
          const rowHeight = Math.max(rowMinHeight, descLines.length * 4 + 4);

          // Draw row background and borders
          pdf.setFillColor(255, 255, 255);
          pdf.rect(tableStartX, yPosition, tableWidth, rowHeight, "FD");

          currentX = tableStartX;
          const textY = yPosition + 6;

          // S.No (centered)
          const snoText = (index + 1).toString();
          const snoWidth = pdf.getTextWidth(snoText);
          pdf.text(snoText, currentX + (colWidths[0] - snoWidth) / 2, textY);
          pdf.line(currentX + colWidths[0], yPosition, currentX + colWidths[0], yPosition + rowHeight);
          currentX += colWidths[0];

          // Description (left aligned, wrapped)
          pdf.text(descLines, currentX + 2, textY);
          pdf.line(currentX + colWidths[1], yPosition, currentX + colWidths[1], yPosition + rowHeight);
          currentX += colWidths[1];

          // Quantity (centered)
          const qtyText = product.quantity.toString();
          const qtyTextWidth = pdf.getTextWidth(qtyText);
          pdf.text(qtyText, currentX + (colWidths[2] - qtyTextWidth) / 2, textY);
          pdf.line(currentX + colWidths[2], yPosition, currentX + colWidths[2], yPosition + rowHeight);
          currentX += colWidths[2];

          // Rate (right aligned)
          const rateText = product.rate.toLocaleString("en-IN");
          const rateTextWidth = pdf.getTextWidth(rateText);
          pdf.text(rateText, currentX + colWidths[3] - rateTextWidth - 2, textY);
          pdf.line(currentX + colWidths[3], yPosition, currentX + colWidths[3], yPosition + rowHeight);
          currentX += colWidths[3];

          // Amount (right aligned)
          const amountText = product.amount.toLocaleString("en-IN");
          const amountTextWidth = pdf.getTextWidth(amountText);
          pdf.text(amountText, currentX + colWidths[4] - amountTextWidth - 2, textY);

          yPosition += rowHeight;
        });

        // Draw bottom border of table
        pdf.line(tableStartX, yPosition, tableStartX + tableWidth, yPosition);

        // Totals section
        yPosition += 10;
        const totalsStartX = tableStartX + colWidths[0] + colWidths[1] + colWidths[2];
        const totalsWidth = colWidths[3] + colWidths[4];
        const labelColWidth = 25; // Reduced label column width
        const valueColWidth = totalsWidth - labelColWidth; // Increased value column width

        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");

        // Subtotal row
        const subtotalHeight = 8;
        pdf.setDrawColor(0, 0, 0);
        pdf.setFillColor(250, 250, 250);
        pdf.rect(totalsStartX, yPosition, totalsWidth, subtotalHeight, "FD");
        pdf.line(totalsStartX + labelColWidth, yPosition, totalsStartX + labelColWidth, yPosition + subtotalHeight);

        pdf.setFont("helvetica", "bold");
        pdf.text("Subtotal:", totalsStartX + 2, yPosition + 5);
        const subtotalText = `₹${state.quotation.subtotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        pdf.text(subtotalText, totalsStartX + labelColWidth + 2, yPosition + 5);
        yPosition += subtotalHeight;

        // GST row
        const gstHeight = 8;
        pdf.setFillColor(250, 250, 250);
        pdf.rect(totalsStartX, yPosition, totalsWidth, gstHeight, "FD");
        pdf.line(totalsStartX + labelColWidth, yPosition, totalsStartX + labelColWidth, yPosition + gstHeight);

        const gstLabel = `GST (${state.quotation.gstRate}%):`;
        pdf.text(gstLabel, totalsStartX + 2, yPosition + 5);
        const gstText = `₹${state.quotation.gstAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        pdf.text(gstText, totalsStartX + labelColWidth + 2, yPosition + 5);
        yPosition += gstHeight;

        // Total row
        const totalHeight = 10;
        pdf.setFillColor(230, 230, 230);
        pdf.rect(totalsStartX, yPosition, totalsWidth, totalHeight, "FD");
        pdf.line(totalsStartX + labelColWidth, yPosition, totalsStartX + labelColWidth, yPosition + totalHeight);

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text("Total:", totalsStartX + 2, yPosition + 6);
        const totalText = `₹${state.quotation.total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        pdf.text(totalText, totalsStartX + labelColWidth + 2, yPosition + 6);
        yPosition += totalHeight + 10;
      }

      const renderMarkdownToPDF = (markdown: string, y: number): number => {
        const tokens = marked.lexer(markdown);
        let listIndex = 1;
        const lineHeight = 5;

        const checkPage = (y: number, extra = 0) => {
          if (y + extra > pageHeight - 20) {
            pdf.addPage();
            return 20;
          }
          return y;
        };

        tokens.forEach((token: any) => {
          if (token.type === "heading") {
            y += 6;
            y = checkPage(y, lineHeight * 2);
            pdf.setFontSize(token.depth === 1 ? 12 : 11);
            pdf.setFont("helvetica", "bold");
            y = addText(token.text, margin, y, contentWidth, token.depth === 1 ? 12 : 11, true);
            y += 3;
            pdf.setFont("helvetica", "normal");
          } else if (token.type === "paragraph") {
            y += 2;
            y = checkPage(y, lineHeight * 3);
            // Handle bold text within paragraphs
            let text = token.text;
            if (text.includes("**")) {
              // Split by bold markers and render accordingly
              const parts = text.split(/(\*\*[^*]+\*\*)/);
              let currentX = margin;
              parts.forEach((part: string) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  const boldText = part.slice(2, -2);
                  pdf.setFont("helvetica", "bold");
                  const textWidth = pdf.getTextWidth(boldText);
                  pdf.text(boldText, currentX, y);
                  currentX += textWidth;
                  pdf.setFont("helvetica", "normal");
                } else if (part.trim()) {
                  const textWidth = pdf.getTextWidth(part);
                  pdf.text(part, currentX, y);
                  currentX += textWidth;
                }
              });
              y += 5;
            } else {
              y = addText(text, margin, y, contentWidth, 9);
            }
            y += 2;
          } else if (token.type === "list") {
            const isOrdered = token.ordered || false;
            listIndex = token.start || 1;

            (token.items as any[]).forEach((item: any) => {
              y = checkPage(y, lineHeight * 2);

              // Clean the text and handle nested formatting
              let text = item.text;
              if (typeof text !== 'string') {
                // Handle complex item structures
                text = item.raw || String(item);
              }

              // Remove markdown formatting for PDF
              text = text.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold markers
              text = text.replace(/^\s*[\*\-\+]\s*/, ''); // Remove bullet markers
              text = text.replace(/^\s*\d+\.\s*/, ''); // Remove number markers

              // Add appropriate prefix
              const prefix = isOrdered ? `${listIndex}. ` : "• ";

              // Split long text into multiple lines if needed
              const maxWidth = contentWidth - 16;
              const lines = pdf.splitTextToSize(`${prefix}${text}`, maxWidth);

              lines.forEach((line: string, index: number) => {
                y = checkPage(y, lineHeight);
                if (index === 0) {
                  y = addText(line, margin + 8, y, maxWidth, 9);
                } else {
                  // Indent continuation lines
                  y = addText(line, margin + 16, y, maxWidth - 8, 9);
                }
              });

              if (isOrdered) listIndex++;
              y += 1;
            });
            y += 3;
          } else if (token.type === "space") {
            y += 3;
          }
        });

        return y;
      };

      // Technical Details
      if (state.quotation.technicalDetails) {
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 20;
        }
        yPosition = addText(
          "Technical Details:",
          margin,
          yPosition,
          undefined,
          12,
          true
        );
        yPosition += 3;
        yPosition = renderMarkdownToPDF(
          state.quotation.technicalDetails,
          yPosition
        );
        yPosition += 5;
      }

      // Key Features
      if (state.quotation.keyFeatures) {
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 20;
        }
        yPosition = addText(
          "Key Features:",
          margin,
          yPosition,
          undefined,
          12,
          true
        );
        yPosition += 3;
        yPosition = renderMarkdownToPDF(state.quotation.keyFeatures, yPosition);
        yPosition += 5;
      }

      // Terms and Conditions
      if (state.quotation.termsAndConditions) {
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 20;
        }
        yPosition = addText(
          "Terms & Conditions:",
          margin,
          yPosition,
          undefined,
          12,
          true
        );
        yPosition += 3;
        yPosition = renderMarkdownToPDF(
          state.quotation.termsAndConditions,
          yPosition
        );
        yPosition += 5;
      }

      // Bank Details
      if (state.quotation.bankDetails) {
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 20;
        }
        // Draw a light gray box for bank details
        const boxHeight = 32;
        yPosition = addText(
          "Bank Details:",
          margin,
          yPosition,
          undefined,
          12,
          true
        );
        yPosition += 3;
        pdf.setDrawColor(220, 220, 220);
        pdf.setFillColor(245, 245, 245);
        pdf.rect(margin, yPosition - 2, contentWidth, boxHeight, "F");
        let bankY = yPosition + 4;
        bankY = addText(
          `Bank Name: ${state.quotation.bankDetails.bankName}`,
          margin + 4,
          bankY,
          undefined,
          9
        );
        bankY = addText(
          `Account Holder: ${state.quotation.bankDetails.accountHolderName}`,
          margin + 4,
          bankY,
          undefined,
          9
        );
        bankY = addText(
          `Account Number: ${state.quotation.bankDetails.accountNumber}`,
          margin + 4,
          bankY,
          undefined,
          9
        );
        bankY = addText(
          `IFSC Code: ${state.quotation.bankDetails.ifscCode}`,
          margin + 4,
          bankY,
          undefined,
          9
        );
        bankY = addText(
          `Branch: ${state.quotation.bankDetails.branch}`,
          margin + 4,
          bankY,
          undefined,
          9
        );
        yPosition += boxHeight + 8;
      }

      // Signature section
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = 20;
      }
      yPosition += 8;
      yPosition = addLine(yPosition);
      yPosition += 8;
      // Signature line
      const signatureX = pageWidth - 80;
      pdf.line(signatureX, yPosition, pageWidth - margin, yPosition);
      yPosition += 5;
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      pdf.text("Authorized Signature", signatureX, yPosition);
      pdf.setFont("helvetica", "normal");
      if (state.quotation.signature) {
        yPosition += 5;
        yPosition = addText(
          state.quotation.signature,
          signatureX,
          yPosition,
          60,
          8
        );
      }

      // Footer
      yPosition = pageHeight - 20;
      pdf.setFontSize(8);
      pdf.setFont("", "normal");
      pdf.text(
        "This is a computer-generated quotation.",
        pageWidth / 2,
        yPosition,
        { align: "center" }
      );
      pdf.text(
        `Generated on ${new Date().toLocaleString()}`,
        pageWidth / 2,
        yPosition + 4,
        { align: "center" }
      );

      // Save the PDF
      pdf.save(`${state.quotation.quotationNumber}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Print styles */}
      <style jsx>{`
        @media print {
          body {
            margin: 0;
          }
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          .container {
            max-width: none !important;
            padding: 0 !important;
          }
        }
      `}</style>

      {/* Action Bar - Hidden in print */}
      <div className="no-print sticky top-0 bg-white border-b border-gray-200 p-4 ">
        <div className="container mx-auto flex justify-between items-center">
          <Button onClick={handleBack} variant="outline" size="lg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Edit
          </Button>
          <div className="flex gap-3">
            <Button onClick={handlePrint} variant="outline" size="lg">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button
              onClick={handleExportPDF}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Quotation Content */}
      <div className="container mx-auto p-8 max-w-4xl">
        {/* Header */}
        {state.quotation.organization && (
          <div className="mb-8 pb-6 border-b-2 border-gray-300">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {state.quotation.organization.name}
                </h1>
                <div className="text-gray-600 space-y-1">
                  <p>{state.quotation.organization.address}</p>
                  <p>Phone: {state.quotation.organization.phone}</p>
                  <p>Email: {state.quotation.organization.email}</p>
                  {state.quotation.organization.website && (
                    <p>Website: {state.quotation.organization.website}</p>
                  )}
                  {state.quotation.organization.gstNumber && (
                    <p>GST: {state.quotation.organization.gstNumber}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold text-blue-600 mb-2">
                  QUOTATION
                </h2>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Quote #:</strong> {state.quotation.quotationNumber}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(state.quotation.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Valid Until:</strong>{" "}
                    {new Date(state.quotation.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Client Information */}
        {state.quotation.client && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Bill To:</h3>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-medium">{state.quotation.client.name}</p>
              <p className="font-medium">{state.quotation.client.company}</p>
              <p className="text-gray-600">{state.quotation.client.address}</p>
              <p className="text-gray-600">
                Phone: {state.quotation.client.phone}
              </p>
              <p className="text-gray-600">
                Email: {state.quotation.client.email}
              </p>
              {state.quotation.client.gstNumber && (
                <p className="text-gray-600">
                  GST: {state.quotation.client.gstNumber}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Subject */}
        {state.quotation.subject && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Subject:</h3>
            <p className="text-gray-700">{state.quotation.subject}</p>
          </div>
        )}

        {/* Products Table */}
        {state.quotation.products.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Product Details:</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left">
                      S.No.
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Description
                    </th>
                    <th className="border border-gray-300 p-3 text-center">
                      Qty
                    </th>
                    <th className="border border-gray-300 p-3 text-right">
                      Rate (₹)
                    </th>
                    <th className="border border-gray-300 p-3 text-right">
                      Amount (₹)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {state.quotation.products.map((product, index) => (
                    <tr key={product.id}>
                      <td className="border border-gray-300 p-3">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {product.description}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {product.quantity}
                      </td>
                      <td className="border border-gray-300 p-3 text-right">
                        {product.rate.toLocaleString("en-IN")}
                      </td>
                      <td className="border border-gray-300 p-3 text-right">
                        {product.amount.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colSpan={4}
                      className="border border-gray-300 p-3 text-right font-medium"
                    >
                      Subtotal:
                    </td>
                    <td className="border border-gray-300 p-3 text-right font-medium">
                      ₹{state.quotation.subtotal.toLocaleString("en-IN")}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={4}
                      className="border border-gray-300 p-3 text-right font-medium"
                    >
                      GST ({state.quotation.gstRate}%):
                    </td>
                    <td className="border border-gray-300 p-3 text-right font-medium">
                      ₹{state.quotation.gstAmount.toLocaleString("en-IN")}
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td
                      colSpan={4}
                      className="border border-gray-300 p-3 text-right font-bold"
                    >
                      Total Amount:
                    </td>
                    <td className="border border-gray-300 p-3 text-right font-bold text-green-600">
                      ₹{state.quotation.total.toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* 1. Technical Details */}
        {state.quotation.technicalDetails && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Technical Details:</h3>
            <div
              className="prose prose-base max-w-none leading-relaxed text-gray-800  p-6 mb-2"
              style={{ lineHeight: "2.1" }}
            >
              <ReactMarkdown
                components={{
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-6 space-y-1" {...(props as any)} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-6 space-y-1" {...(props as any)} />
                  ),
                  li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                }}
              >
                {state.quotation.technicalDetails}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* 2. Key Features */}
        {state.quotation.keyFeatures && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Key Features:</h3>
            <div
              className="prose prose-base max-w-none leading-relaxed text-gray-800  p-6 mb-2"
              style={{ lineHeight: "2.1" }}
            >
              <ReactMarkdown
                components={{
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-6 space-y-1" {...(props as any)} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-6 space-y-1" {...(props as any)} />
                  ),
                  li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                }}
              >
                {state.quotation.keyFeatures}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* 3. Terms and Conditions */}
        {state.quotation.termsAndConditions && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Terms & Conditions:</h3>
            <div
              className="prose prose-base max-w-none leading-relaxed text-gray-800  p-6 mb-2"
              style={{ lineHeight: "2.1" }}
            >
              <ReactMarkdown
                components={{
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-6 space-y-1" {...(props as any)} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-6 space-y-1" {...(props as any)} />
                  ),
                  li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                }}
              >
                {state.quotation.termsAndConditions}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Bank Details */}
        {state.quotation.bankDetails && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Bank Details:</h3>
            <div className="bg-gray-50 p-4 rounded">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>Bank Name:</strong>{" "}
                    {state.quotation.bankDetails.bankName}
                  </p>
                  <p>
                    <strong>Account Holder:</strong>{" "}
                    {state.quotation.bankDetails.accountHolderName}
                  </p>
                  <p>
                    <strong>Branch:</strong>{" "}
                    {state.quotation.bankDetails.branch}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Account Number:</strong>{" "}
                    {state.quotation.bankDetails.accountNumber}
                  </p>
                  <p>
                    <strong>IFSC Code:</strong>{" "}
                    {state.quotation.bankDetails.ifscCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Signature */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-gray-600 mb-8">
                Thank you for your business!
              </p>
            </div>
            <div className="text-right">
              <div className="w-48 h-16 border-b border-gray-400 mb-2"></div>
              <p className="text-sm font-medium">Authorized Signature</p>
              {state.quotation.signature && (
                <div className="mt-2 text-xs text-gray-600 whitespace-pre-wrap">
                  {state.quotation.signature}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>
            This is a computer-generated quotation and does not require a
            physical signature.
          </p>
          <p>Generated on {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
