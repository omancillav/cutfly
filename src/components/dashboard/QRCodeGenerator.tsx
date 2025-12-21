"use client";
import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-media-query";

interface QRCodeGeneratorProps {
  url: string;
  linkCode: string;
  onClose?: () => void;
}

export function QRCodeGenerator({ url, linkCode }: QRCodeGeneratorProps) {
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  // Tamaño del QR según el dispositivo
  const qrSize = isDesktop ? 350 : 280;

  useEffect(() => {
    // Estilo predefinido elegante para el QR
    const qr = new QRCodeStyling({
      width: qrSize,
      height: qrSize,
      data: url,
      image: "/cutfly_logo.webp",
      margin: 0,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "H", // High error correction (30%)
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 15,
      },
      dotsOptions: {
        color: "#000000",
        type: "rounded",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        color: "#000000",
        type: "extra-rounded",
      },
      cornersDotOptions: {
        color: "#000000",
        type: "dot",
      },
    });

    setQrCode(qr);

    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }
  }, [url, qrSize]);

  const handleDownloadPNG = () => {
    if (qrCode) {
      qrCode.download({
        name: `qr-${linkCode}`,
        extension: "png",
      });
    }
  };

  const handleShare = async () => {
    if (!qrCode) return;

    try {
      // Convertir el QR a blob
      const rawData = await qrCode.getRawData("png");
      if (!rawData) {
        toast.error("Error generating QR code image");
        return;
      }

      // Convertir a Blob si es necesario
      let blob: Blob;
      if (rawData instanceof Blob) {
        blob = rawData;
      } else {
        // Si es Buffer, convertir a ArrayBuffer primero
        const arrayBuffer = rawData instanceof ArrayBuffer 
          ? rawData 
          : new Uint8Array(rawData as Buffer).buffer;
        blob = new Blob([arrayBuffer], { type: "image/png" });
      }

      const file = new File([blob], `qr-${linkCode}.png`, { type: "image/png" });

      // Verificar si la Web Share API está disponible
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `QR Code for /${linkCode}`,
          text: `QR Code for ${url}`,
        });
      } else {
        // Fallback: descargar la imagen
        qrCode.download({
          name: `qr-${linkCode}`,
          extension: "png",
        });
        toast.info("Sharing not available, downloading instead");
      }
    } catch (error) {
      // Usuario canceló o error
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Error sharing:", error);
      }
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* QR Code Preview */}
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div ref={qrRef} />
      </div>

      {/* URL Display with Copy Button */}
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg border">
          <p className="text-sm flex-1 truncate">{url}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyUrl}
            className="h-8 w-8 p-0"
          >
            {copied ? (
              <Check size={16} className="text-green-600" />
            ) : (
              <Copy size={16} />
            )}
          </Button>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <Button
          onClick={handleDownloadPNG}
          className="flex-1 gap-2"
          variant="default"
        >
          <Download size={16} />
          Download PNG
        </Button>
        <Button
          onClick={handleShare}
          className="flex-1 gap-2"
          variant="outline"
        >
          <Share2 size={16} />
          Share
        </Button>
      </div>
    </div>
  );
}
