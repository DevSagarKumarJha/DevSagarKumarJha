import { z } from "zod"

export const AddCertificateFormSchema = z.object({
    title: z.string().min(1, 'Title must have at least 1 character'),
    issuingOrganization: z.string().min(1, 'Issuing organization must have at least 1 character'),
    credentialId: z.string().min(1, 'Credential ID must have at least 1 character').default(""),
    img: z.string().url('Invalid image URL').optional(),
    credentialUrl: z.string().url('Invalid credential URL').min(1, 'Credential URL must have at least 1 character').default(""),
    issueDate: z.date(),
    expiryDate: z.date().nullable(),
    createdAt: z.date().nullable(),
})