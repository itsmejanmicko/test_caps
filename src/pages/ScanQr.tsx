import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { useNavigate } from "react-router-dom";
import { mockUser } from "@/database/mockUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const ScanQr = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [result, setResult] = useState<object | null>(null);
    const controlsRef = useRef<IScannerControls | null>(null);
    const [scanning, setScanning] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!videoRef.current) return;

        const codeReader = new BrowserMultiFormatReader();

        codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, err, controls) => {
            if (controls) {
                controlsRef.current = controls;
            }
            if (result) {
                setScanning(true);
                const scannedText = result.getText().trim();

                // Extract studentId using regex
                const studentIdMatch = scannedText.match(/"studentId"\s*:\s*"(\d{4}-\d{6})"/);
                const extractedStudentId = studentIdMatch ? studentIdMatch[1] : null;

                if (extractedStudentId) {
                    console.log("Extracted Student ID:", extractedStudentId);

                    const user = mockUser.find((user) => user.studentId.trim() === extractedStudentId);

                    if (user) {
                        console.log("User exists:", user);
                        navigate("/image", { state: { user } }); 
                    } else {
                        setResult({
                            message: "User not found",
                            scannedData: extractedStudentId
                        });
                    }
                } else {
                    setResult({ message: "Invalid QR Code format" });
                    console.log(err)
                }
                setScanning(false);
            }
        }).catch((err) => console.error("QR Scanner Error:", err));

        return () => {
            controlsRef.current?.stop();
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-lg shadow-lg rounded-xl bg-white dark:bg-gray-800">
                <CardHeader>
                    <CardTitle className="text-center text-lg font-semibold text-gray-900 dark:text-white">
                        QR Code Scanner
                    </CardTitle>
                    <p className="text-center text-gray-500 text-sm">Scan a QR code to check user information</p>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <div className="relative flex justify-center items-center border border-gray-300 dark:border-gray-700 rounded-lg p-2 w-full">
                        <video ref={videoRef} className="w-full max-h-56 rounded-lg" autoPlay />
                    </div>

                    {scanning && (
                        <Skeleton className="h-5 w-40 mt-3 bg-gray-300 dark:bg-gray-700" />
                    )}

                    {result && (
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mt-4 w-full">
                            <h3 className="font-semibold text-gray-700 dark:text-white">Scan Result:</h3>
                            <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-x-auto">
                                {JSON.stringify(result, null, 2)}
                            </pre>
                        </div>
                    )}

                    <Button
                        type="button"
                        className="mt-4 w-full"
                        onClick={() => setResult(null)}
                    >
                        Clear Result
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default ScanQr;
