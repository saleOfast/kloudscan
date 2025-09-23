'use client'
import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    Stack,
    Divider,
    useTheme,
    useMediaQuery,
    IconButton,
    Card,
    CardContent,
    CircularProgress,
    Alert,
    Snackbar,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

export default function AadhaarUpload() {
    const router = useRouter();

    // File objects instead of URLs
    const [frontCameraFile, setFrontCameraFile] = useState<File | null>(null);
    const [frontFileFile, setFrontFileFile] = useState<File | null>(null);
    const [backCameraFile, setBackCameraFile] = useState<File | null>(null);
    const [backFileFile, setBackFileFile] = useState<File | null>(null);
    const [response, setResponse] = useState(null)


    if (response) {
        console.log(response, "setResponsesetResponse")
    }

    // Preview URLs for display
    const [frontCameraPreview, setFrontCameraPreview] = useState<string | null>(null);
    const [frontFilePreview, setFrontFilePreview] = useState<string | null>(null);
    const [backCameraPreview, setBackCameraPreview] = useState<string | null>(null);
    const [backFilePreview, setBackFilePreview] = useState<string | null>(null);

    // Loading and error states
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFile: (file: File | null) => void,
        setPreview: (url: string | null) => void
    ) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                setError("File size must be less than 5MB");
                return;
            }

            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
            if (!validTypes.includes(file.type)) {
                setError("Please upload JPG, PNG, or PDF files only");
                return;
            }

            setFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = (
        setFile: (file: File | null) => void,
        setPreview: (url: string | null) => void,
        currentPreview: string | null
    ) => {
        setFile(null);
        if (currentPreview) {
            URL.revokeObjectURL(currentPreview);
        }
        setPreview(null);
    };

    const handleProcessDocuments = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Check if at least one file from each side is uploaded
            const frontFile = frontCameraFile || frontFileFile;
            const backFile = backCameraFile || backFileFile;

            if (!frontFile || !backFile) {
                setError("Please upload both front and back images of your Emirates ID");
                setIsLoading(false);
                return;
            }

            // Create FormData for multipart upload
            const formData = new FormData();

            // Add files to FormData
            formData.append('Front_EmiratesID1', frontFile);
            formData.append('Back_EmiratesID2', backFile);

            // Add metadata if needed
            formData.append('documentType', 'emiratesId');
            formData.append('uploadTime', new Date().toISOString());

            // Make API call to backend
            const response = await fetch('http://localhost:3001/api/emirates/verify-emirates', {
                method: 'POST',
                body: formData,
                // Don't set Content-Type header - let browser set it with boundary
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setResponse(result)

            // Handle successful upload
            setSuccess(true);
            console.log('Upload successful:', result);

            // Navigate after a short delay to show success message
            const queryParams = new URLSearchParams({ response: JSON.stringify(result) }).toString();
            setTimeout(() => {
                setTimeout(() => {
                    router.push(`/about?${queryParams}`); // Redirect with the query string
                }, 2000);
            }, 2000);
        } catch (err) {
            console.error('Upload error:', err);
            setError(err instanceof Error ? err.message : 'Failed to upload documents. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderUploadSection = (
        title: string,
        cameraFile: File | null,
        fileFile: File | null,
        cameraPreview: string | null,
        filePreview: string | null,
        setCameraFile: (file: File | null) => void,
        setFileFile: (file: File | null) => void,
        setCameraPreview: (url: string | null) => void,
        setFilePreview: (url: string | null) => void,
        side: string
    ) => (
        <Card
            sx={{
                mb: 1,
                borderRadius: 3,
                boxShadow: 3,
                background: "linear-gradient(135deg, #f9f9f9, #ffffff)",
            }}
        >
            <CardContent>
                <Typography
                    textAlign="center"
                    variant="h6"
                    mb={2}
                    fontWeight="bold"
                    color="primary.main"
                >
                    {title}
                </Typography>

                <Stack
                    direction={isMobile ? "column" : "row"}
                    // spacing={3}
                    alignItems="center"
                    justifyContent="center"
                >
                    {/* Camera Upload */}
                    <Box textAlign="center">
                        <Button
                            variant="contained"
                            component="label"
                            size="large"
                            startIcon={<PhotoCameraIcon />}
                            fullWidth={isMobile}
                            sx={{ mb: 2, borderRadius: 2 }}
                            disabled={isLoading}
                        >
                            Capture with Camera
                            <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                hidden
                                onChange={(e) => handleImageChange(e, setCameraFile, setCameraPreview)}
                            />
                        </Button>
                        {cameraPreview && (
                            <Box
                                sx={{
                                    position: "relative",
                                    maxWidth: 250,
                                    mx: "auto",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    boxShadow: 4,
                                }}
                            >
                                <img
                                    src={cameraPreview}
                                    alt={`${side} Camera Preview`}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        display: "block",
                                    }}
                                />
                                <IconButton
                                    size="small"
                                    color="error"
                                    sx={{ position: "absolute", top: 8, right: 8, bgcolor: "white" }}
                                    onClick={() => handleRemoveImage(setCameraFile, setCameraPreview, cameraPreview)}
                                    disabled={isLoading}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        )}
                        {cameraFile && (
                            <Typography variant="caption" display="block" mt={1} color="text.secondary">
                                {cameraFile.name} ({(cameraFile.size / (1024 * 1024)).toFixed(2)} MB)
                            </Typography>
                        )}
                    </Box>

                    <Typography variant="subtitle1" color="text.secondary" fontWeight="medium">
                        OR
                    </Typography>

                    {/* File Upload */}
                    <Box textAlign="center">
                        <Button
                            variant="outlined"
                            component="label"
                            size="large"
                            startIcon={<UploadFileIcon />}
                            fullWidth={isMobile}
                            sx={{ mb: 2, borderRadius: 2 }}
                            disabled={isLoading}
                        >
                            Upload from Files
                            <input
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,application/pdf"
                                hidden
                                onChange={(e) => handleImageChange(e, setFileFile, setFilePreview)}
                            />
                        </Button>
                        {filePreview && (
                            <Box
                                sx={{
                                    position: "relative",
                                    maxWidth: 250,
                                    mx: "auto",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    boxShadow: 4,
                                }}
                            >
                                <img
                                    src={filePreview}
                                    alt={`${side} File Preview`}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        display: "block",
                                    }}
                                />
                                <IconButton
                                    size="small"
                                    color="error"
                                    sx={{ position: "absolute", top: 8, right: 8, bgcolor: "white" }}
                                    onClick={() => handleRemoveImage(setFileFile, setFilePreview, filePreview)}
                                    disabled={isLoading}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        )}
                        {fileFile && (
                            <Typography variant="caption" display="block" mt={1} color="text.secondary">
                                {fileFile.name} ({(fileFile.size / (1024 * 1024)).toFixed(2)} MB)
                            </Typography>
                        )}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );

    return (
        <Box
            sx={{
                maxWidth: 800,
                mx: "auto",
                mt: 1,
                p: { xs: 2, sm: 4 },
            }}
        >
            <Typography
                variant="h5"
                mb={1}
                textAlign="center"
                fontWeight="bold"
                color="primary"
            >
                Upload Your Emirates ID
            </Typography>
            <Typography sx={{ fontSize: '12px', textAlign: 'center', mb: 3 }}>
                Please upload clear photos of both the front and back of your Emirates ID. Ensure the text is readable and the entire card is visible.
                <br />
                JPG, PNG, PDF formats • Maximum 5MB file size • Clear, readable text
            </Typography>

            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            {/* Front Side */}
            {renderUploadSection(
                "Front Side of Emirates ID",
                frontCameraFile,
                frontFileFile,
                frontCameraPreview,
                frontFilePreview,
                setFrontCameraFile,
                setFrontFileFile,
                setFrontCameraPreview,
                setFrontFilePreview,
                "Front"
            )}

            <Divider sx={{ my: 1 }} />

            {/* Back Side */}
            {renderUploadSection(
                "Back Side of Emirates ID",
                backCameraFile,
                backFileFile,
                backCameraPreview,
                backFilePreview,
                setBackCameraFile,
                setBackFileFile,
                setBackCameraPreview,
                setBackFilePreview,
                "Back"
            )}

            {/* Process Button */}
            <Box textAlign="center" mt={3}>
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={handleProcessDocuments}
                    sx={{ py: 1.5, fontSize: "1rem", borderRadius: 3 }}
                    disabled={
                        isLoading ||
                        !(
                            (frontCameraFile || frontFileFile) &&
                            (backCameraFile || backFileFile)
                        )
                    }
                >
                    {isLoading ? (
                        <>
                            <CircularProgress size={20} sx={{ mr: 1 }} />
                            Processing...
                        </>
                    ) : (
                        "Process Documents"
                    )}
                </Button>
            </Box>

            {/* Success Snackbar */}
            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={() => setSuccess(false)}
            >
                <Alert severity="success" onClose={() => setSuccess(false)}>
                    Documents uploaded successfully! Redirecting...
                </Alert>
            </Snackbar>
        </Box>
    );
}