'use client'
import React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Divider,
    Stack,
    Button,
} from "@mui/material";

export default function ExtractedInfoCard() {
    const data = {
        fullName: "Ahmed Mohammed Al Rashid",
        idNumber: "784–1990–1234567–8",
        nationality: "United Arab Emirates",
        dob: "15/03/1990",
        gender: "Male",
        expiryDate: "14/03/2030",
    };

    return (
        <Card
            sx={{
                maxWidth: 600,
                mx: "auto",
                // mt: 5,
                borderRadius: 3,
                boxShadow: 3,
                paddingBottom: 4
            }}
        >
            <CardContent>
                {/* Header */}
                <Typography textAlign="center" variant="h6" fontWeight="bold" mb={2}>
                    Extracted Information
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {/* Stack for one-per-line layout */}
                <Stack spacing={2}>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Full Name
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ p: 1, bgcolor: "grey.100", borderRadius: 1 }}
                        >
                            {data.fullName}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            ID Number
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ p: 1, bgcolor: "grey.100", borderRadius: 1 }}
                        >
                            {data.idNumber}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Nationality
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ p: 1, bgcolor: "grey.100", borderRadius: 1 }}
                        >
                            {data.nationality}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Date of Birth
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ p: 1, bgcolor: "grey.100", borderRadius: 1 }}
                        >
                            {data.dob}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Gender
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ p: 1, bgcolor: "grey.100", borderRadius: 1 }}
                        >
                            {data.gender}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Expiry Date
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ p: 1, bgcolor: "grey.100", borderRadius: 1 }}
                        >
                            {data.expiryDate}
                        </Typography>
                    </Box>

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
                            sx={{ py: 1.5, fontSize: "1rem", borderRadius: 3 }}
                        >
                            Process Documents
                        </Button>

                    </Box>

                </Stack>

            </CardContent>

        </Card>
    );
}
