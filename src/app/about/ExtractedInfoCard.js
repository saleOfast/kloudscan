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

    const parseDate = (dateString) => {
        if (!dateString) return null;
        // Handle different date formats: DD-MM-YYYY, MM/DD/YYYY, etc.
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date.toISOString().split('T')[0];
    };
    // Submit extracted data to backend
    const handleSubmit = async () => {
        if (!response) return;

        // const payload = {

        //     fullName: response?.data?.back_result?.data?.name,
        //     idNumber: response?.data?.back_result?.data?.idNumber,
        //     nationality: response?.data?.back_result?.data?.nationality,
        //     dateOfBirth: response?.data?.back_result?.data?.DOB,
        //     gender: response?.data?.back_result?.data?.sex,
        //     expiryDate: response?.data?.back_result?.data?.expiryDate,
        //     Front_EmiratesID1: response.data.Front_EmiratesID1,
        //     Back_EmiratesID2: response.data.Back_EmiratesID2,


        // };
        // const payload = {
        //     front_record_id: response.data.front_result.recordId,
        //     front_data_retrieval_status: response.data.front_result.dataRetrievalStatus,
        //     front_id_number: response.data.front_result.data.idNumber,
        //     front_name: response.data.front_result.data.name,
        //     front_sex: response.data.front_result.data.sex,
        //     front_nationality: response.data.front_result.data.nationality,
        //     front_dob: parseDate(response.data.front_result.data.DOB),
        //     front_issue_date: parseDate(response.data.front_result.data.issueDate),
        //     front_expiry_date: parseDate(response.data.front_result.data.expiryDate),
        //     front_utc_time_stamp: response.data.front_result.data.utc_time_stamp,
        //     front_arabic_name_status: response.data.front_result.data.arabic_name_status,
        //     front_arabic_name: response.data.front_result.data.arabic_name,

        //     // Back OCR result fields
        //     back_record_id: response.data.back_result.recordId,
        //     back_data_retrieval_status: response.data.back_result.dataRetrievalStatus,
        //     back_id_number: response.data.back_result.data.idNumber,
        //     back_card_number: response.data.back_result.data.cardNumber,
        //     back_name: response.data.back_result.data.name,
        //     back_sex: response.data.back_result.data.sex,
        //     back_nationality: response.data.back_result.data.nationality,
        //     back_dob: parseDate(response.data.back_result.data.DOB),
        //     back_issue_date: parseDate(response.data.back_result.data.issueDate),
        //     back_issue_place: response.data.back_result.data.issuePlace,
        //     back_expiry_date: parseDate(response.data.back_result.data.expiryDate),
        //     back_occupation: response.data.back_result.data.occupation,
        //     back_employer: response.data.back_result.data.employer,
        //     back_family_sponsor: response.data.back_result.data.familySponsor,
        //     back_utc_time_stamp: response.data.back_result.data.utc_time_stamp,

        //     // Uploaded images (keep original mapping if needed)
        //     Front_EmiratesID1: response.data.Front_EmiratesID1,
        //     Back_EmiratesID2: response.data.Back_EmiratesID2,

        // }


        // const payload = {
        //     message: "Verification successful", // optional
        //     data: {
        //         front_result: response.data.front_result,
        //         back_result: response.data.back_result,
        //         Front_EmiratesID1: response.data.Front_EmiratesID1,
        //         Back_EmiratesID2: response.data.Back_EmiratesID2,
        //     }
        // };

        const payload = {
            message: "Verification successful",
            data: {
                front_result: {
                    recordId: response.data.front_result.recordId,
                    dataRetrievalStatus: response.data.front_result.dataRetrievalStatus,
                    idNumber: response.data.front_result.data.idNumber?.value || "",
                    name: response.data.front_result.data.name?.value || "",
                    sex: response.data.front_result.data.sex?.value || "",
                    nationality: response.data.front_result.data.nationality?.value || "",
                    dob: response.data.front_result.data.DOB?.value || "",
                    issueDate: response.data.front_result.data.issueDate?.value || "",
                    expiryDate: response.data.front_result.data.expiryDate?.value || "",
                    arabicName: response.data.front_result.data.arabic_name?.value || "",
                    arabicNameStatus: response.data.front_result.data.arabic_name_status || "",
                    utcTimeStamp: response.data.front_result.utc_time_stamp,
                },
                back_result: {
                    recordId: response.data.back_result.recordId,
                    dataRetrievalStatus: response.data.back_result.dataRetrievalStatus,
                    idNumber: response.data.back_result.data.idNumber?.value || "",
                    cardNumber: response.data.back_result.data.cardNumber?.value || "",
                    name: response.data.back_result.data.name?.value || "",
                    sex: response.data.back_result.data.sex?.value || "",
                    nationality: response.data.back_result.data.nationality?.value || "",
                    dob: response.data.back_result.data.DOB?.value || "",
                    issueDate: response.data.back_result.data.issueDate?.value || "",
                    issuePlace: response.data.back_result.data.issuePlace?.value || "",
                    expiryDate: response.data.back_result.data.expiryDate?.value || "",
                    occupation: response.data.back_result.data.occupation?.value || "",
                    employer: response.data.back_result.data.employer?.value || "",
                    familySponsor: response.data.back_result.data.familySponsor?.value || "",
                    utcTimeStamp: response.data.back_result.utc_time_stamp,
                },
                Front_EmiratesID1: response.data.Front_EmiratesID1,
                Back_EmiratesID2: response.data.Back_EmiratesID2,
            },
        };


        // const payload = {

        //     front_result: response.data.front_result.data,
        //     back_result: response.data.back_result.data,
        //     Front_EmiratesID1: response.data.Front_EmiratesID1,
        //     Back_EmiratesID2: response.data.Back_EmiratesID2
        // }

        try {
            setIsSubmitting(true);
            const res = await fetch('https://kloudscan-backend-pyzp.onrender.com/api/emirates/save-emirates', {
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
            alert("Emirates ID data already exists");
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
                    <InfoField label="Full Name" value={response.data.back_result.data.name?.value} />
                    <InfoField label="Arabic Full Name" value={response.data.front_result.data.arabic_name?.value} />
                    <InfoField label="ID Number" value={response.data.back_result.data.idNumber?.value} />
                    <InfoField label="Occupation" value={response.data.back_result.data.occupation?.value} />
                    <InfoField label="Employer" value={response.data.back_result.data.employer?.value} />
                    <InfoField label="Issue Place" value={response.data.back_result.data.issuePlace?.value} />
                    <InfoField label="Nationality" value={response.data.back_result.data.nationality?.value} />
                    <InfoField label="Date of Birth" value={response.data.back_result.data.DOB?.value} />
                    <InfoField label="Gender" value={response.data.back_result.data.sex?.value} />
                    <InfoField label="Expiry Date" value={response.data.back_result.data.expiryDate?.value} />

                    <Box>
                        <Typography sx={{ mt: 2 }} textAlign="center" variant="h6" fontWeight="bold" gutterBottom>
                            Ready to Save?
                        </Typography>
                        <Typography variant="body2" color="text.secondary" fontSize={12} mb={2}>
                            Please verify all information is correct before proceeding.
                            This data will be saved to your account.
                        </Typography>

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                py: 1,
                                fontSize: "1rem",
                                borderRadius: 3,
                                backgroundColor: "#D3AF37",
                                color: "black",
                            }}
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
