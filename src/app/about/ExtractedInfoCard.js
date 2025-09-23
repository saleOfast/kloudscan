'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Divider,
    Stack,
    Button,
    CircularProgress
} from "@mui/material";

export default function ExtractedInfoCard() {
    const searchParams = useSearchParams();
    const [response, setResponse] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Extract and parse the response from query string
    useEffect(() => {
        const responseParam = searchParams.get('response');
        if (responseParam) {
            try {
                const parsed = JSON.parse(responseParam);
                setResponse(parsed);
            } catch (e) {
                console.error('❌ Failed to parse response from query string', e);
            }
        }
    }, [searchParams]);

    // Submit extracted data to backend
    const handleSubmit = async () => {
        if (!response) return;

        const payload = {
            fullName: response?.data?.back_result?.data?.name,
            idNumber: response?.data?.back_result?.data?.idNumber,
            nationality: response?.data?.back_result?.data?.nationality,
            dateOfBirth: response?.data?.back_result?.data?.DOB,
            gender: response?.data?.back_result?.data?.sex,
            expiryDate: response?.data?.back_result?.data?.expiryDate,
            Front_EmiratesID1: response.data.Front_EmiratesID1,
            Back_EmiratesID2: response.data.Back_EmiratesID2

        };

        try {
            setIsSubmitting(true);
            const res = await fetch('http://localhost:3001/api/emirates/save-emirates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error(`Failed to save data: ${res.status}`);
            }

            const result = await res.json();
            console.log("✅ Successfully saved:", result);
            setSubmitSuccess(true);
        } catch (err) {
            console.error("❌ Save error:", err);
            alert("Something went wrong while saving. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show loading spinner until response is loaded
    if (!response) {
        return (
            <Box textAlign="center" mt={4}>
                <CircularProgress />
                <Typography variant="body2" mt={2}>Loading extracted information...</Typography>
            </Box>
        );
    }

    return (
        <Card
            sx={{
                maxWidth: 600,
                mx: "auto",
                borderRadius: 3,
                boxShadow: 3,
                paddingBottom: 4
            }}
        >
            <CardContent>
                <Typography textAlign="center" variant="h6" fontWeight="bold" mb={2}>
                    Extracted Information
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Stack spacing={1}>
                    <InfoField label="Full Name" value={response.data.back_result.data.name} />
                    <InfoField label=" Arabic Full Name" value={response.data.front_result.data.arabic_name} />
                    <InfoField label="ID Number" value={response.data.back_result.data.idNumber} />
                    <InfoField label="Occupation" value={response.data.back_result.data.occupation} />
                    <InfoField label="Employer" value={response.data.back_result.data.employer} />
                    <InfoField label="IssuePlace" value={response.data.back_result.data.issuePlace} />
                    <InfoField label="Nationality" value={response.data.back_result.data.nationality} />
                    <InfoField label="Date of Birth" value={response.data.back_result.data.DOB} />
                    <InfoField label="Gender" value={response.data.back_result.data.sex} />
                    <InfoField label="Expiry Date" value={response.data.back_result.data.expiryDate} />

                    <Box>
                        <Typography sx={{ mt: 2 }} textAlign="center" variant="h6" fontWeight="bold" gutterBottom>
                            Ready to Save?
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            fontSize={12}
                            mb={2}
                        >
                            Please verify all information is correct before proceeding.
                            This data will be saved to your account.
                        </Typography>

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            color="primary"
                            sx={{ py: 1, fontSize: "1rem", borderRadius: 3 }}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Process Documents"}
                        </Button>

                        {submitSuccess && (
                            <Typography color="success.main" textAlign="center" mt={2}>
                                ✅ Data saved successfully!
                            </Typography>
                        )}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}

// ✅ Reusable InfoField component
function InfoField({ label, value }) {
    return (
        <Box>
            <Typography variant="subtitle2" color="text.secondary">
                {label}
            </Typography>
            <Typography
                variant="body1"
                sx={{ p: 1, bgcolor: "grey.100", borderRadius: 1 }}
            >
                {value || '—'}
            </Typography>
        </Box>
    );
}
