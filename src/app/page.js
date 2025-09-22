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
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

export default function AadhaarUpload() {
    const router = useRouter();

    const [frontCameraImage, setFrontCameraImage] = useState(null);
    const [frontFileImage, setFrontFileImage] = useState(null);
    const [backCameraImage, setBackCameraImage] = useState(null);
    const [backFileImage, setBackFileImage] = useState(null);


    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleImageChange = (e, setImage) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleRemoveImage = (setImage) => setImage(null);

    const handleProcessDocuments = () => {
        alert("Processing uploaded Emirates ID...");
        router.push('/about')
    };

    const renderUploadSection = (title, cameraImage, fileImage, setCameraImage, setFileImage, side) => (
        <Card
            sx={{
                mb: 3,
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
                        >
                            Capture with Camera
                            <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                hidden
                                onChange={(e) => handleImageChange(e, setCameraImage)}
                            />
                        </Button>
                        {cameraImage && (
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
                                    src={cameraImage}
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
                                    onClick={() => handleRemoveImage(setCameraImage)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
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
                        >
                            Upload from Files
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => handleImageChange(e, setFileImage)}
                            />
                        </Button>
                        {fileImage && (
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
                                    src={fileImage}
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
                                    onClick={() => handleRemoveImage(setFileImage)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
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

                JPG, PNG, PDF formats
                Maximum 5MB file size
                Clear, readable text
            </Typography>

            {/* Front Side */}
            {renderUploadSection(
                "Front Side of Aadhaar Card",
                frontCameraImage,
                frontFileImage,
                setFrontCameraImage,
                setFrontFileImage,
                "Front"
            )}

            <Divider sx={{ my: 3 }} />

            {/* Back Side */}
            {renderUploadSection(
                "Back Side of Aadhaar Card",
                backCameraImage,
                backFileImage,
                setBackCameraImage,
                setBackFileImage,
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
                // disabled={
                //     !(
                //         (frontCameraImage || frontFileImage) &&
                //         (backCameraImage || backFileImage)
                //     )
                // }
                >
                    Process Documents
                </Button>
            </Box>
        </Box>
    );
}
