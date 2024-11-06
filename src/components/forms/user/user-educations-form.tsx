// 'use client'

// // components
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Separator } from '@/components/ui/separator'

// // svg
// import { X } from 'lucide-react'

// // utils
// import { cn } from '@/src/lib/utils'
// import { useState } from 'react'
// import { updateUser } from '@/src/actions-old/user-actions'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useToast } from '@/hooks/use-toast'
// import { useRouter } from 'next/navigation'
// import { useModal } from '@/hooks/use-modal-store'

// // validation
// import { userEducationsFormSchema } from '@/validation/user'

// // types
// import { User } from '@/types/user-types'
// import {
//   UserEducation,
//   UserEducationsFormItem,
//   UserEducationsFormData,
//   CreateUserEducationsReqBody,
//   UpdateUserEducationsReqBody,
//   UserEducationsFormItems,
// } from '@/types/user-types'

// export const UserEducationsForm: React.FC<{ user: User }> = ({ user }) => {
//   const router = useRouter()
//   const { toast } = useToast()
//   const { onClose } = useModal()

//   const [userEducationsToDelete, setUserEducationsToDelete] =
//     useState<{ id: string }[]>()

//   const [renderedFormValues, setRenderedFormValues] = useState<
//     UserEducationsFormItems | undefined
//   >(user.userEducations)

//   const form = useForm({
//     resolver: zodResolver(userEducationsFormSchema),
//     defaultValues: {
//       userEducations: user.userEducations,
//     },
//   })

//   const {
//     getValues,
//     handleSubmit,
//     formState: { isSubmitting },
//     setValue,
//   } = form

//   const action: () => void = handleSubmit(
//     async (formData: UserEducationsFormData) => {
//       const { userEducations } = formData
//       if (userEducations) {
//         let createRes, updateRes
//         const { createReqBody, updateReqsBodies } =
//           formatReqBody(userEducations)

//         // Send req to create educations
//         if (createReqBody) {
//           createRes = await updateUser(createReqBody, user)
//         }

//         // Send requests to update educations
//         if (updateReqsBodies) {
//           updateRes = await Promise.all(
//             updateReqsBodies.map(async (reqBody) => {
//               return await updateUser(reqBody, user)
//             })
//           )
//         }

//         // Send req to delete educations
//         if (userEducationsToDelete) {
//           const reqBody = {
//             userEducations: {
//               deleteMany: userEducationsToDelete,
//             },
//           }

//           await updateUser(reqBody, user)
//         }

//         // Check if any response has server error
//         let resIncludesServerError = false

//         if (createRes && !createRes?.success) {
//           resIncludesServerError = true
//         }

//         updateRes?.every((res) => {
//           if (!res?.success) {
//             resIncludesServerError = true
//             return false
//           }
//           return true
//         })

//         // If any server errors from any response, give toast message
//         if (resIncludesServerError) {
//           toast({
//             title: 'Error!',
//             description: createRes?.message,
//             variant: 'destructive',
//           })
//         }

//         // If successful, refresh page
//         if (!resIncludesServerError) {
//           onClose()
//           router.refresh()
//           toast({
//             title: 'Success!',
//             description: createRes?.message,
//           })
//         }
//       }
//     }
//   )

//   return (
//     <Form {...form}>
//       <form
//         action={action}
//         autoComplete="off"
//         className="flex flex-col gap-4 justify-center"
//       >
//         <div
//           className={cn(
//             'flex flex-col gap-4 max-h-[500px] overflow-y-auto',
//             renderedFormValues && renderedFormValues?.length > 1 ? 'pr-4' : ''
//           )}
//         >
//           {renderedFormValues?.length
//             ? renderedFormValues.map((_, i, arr) => {
//                 return (
//                   <div key={i} className="relative flex flex-col gap-4">
//                     <p className="h4">Past education</p>

//                     <FormField
//                       name={`userEducations.${i}.school`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>School</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="School"
//                               disabled={isSubmitting}
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       name={`userEducations.${i}.degree`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Degree</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Degree"
//                               disabled={isSubmitting}
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       name={`userEducations.${i}.startYear`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Start year</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="number"
//                               placeholder="Start year"
//                               disabled={isSubmitting}
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       name={`userEducations.${i}.endYear`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>End year</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="number"
//                               placeholder="End year"
//                               disabled={isSubmitting}
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     {i !== arr.length - 1 && <Separator />}

//                     <button
//                       onClick={(e) => {
//                         e.preventDefault()
//                         const formValues = getValues()
//                         const filteredValues =
//                           formValues.userEducations?.filter((edu, j) => {
//                             const isFiltered = i === j
//                             if (isFiltered && edu.id) {
//                               setUserEducationsToDelete((prevState) => [
//                                 ...(prevState ? prevState : []),
//                                 { id: edu.id },
//                               ])
//                             }
//                             return !isFiltered
//                           })
//                         setValue('userEducations', filteredValues)
//                         setRenderedFormValues(filteredValues)
//                       }}
//                       className="absolute transition-colors focus:bg-accent hover:bg-accent p-1 top-0 right-0 rounded-full bg-muted"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 )
//               })
//             : null}
//         </div>

//         <button
//           onClick={(e) => {
//             e.preventDefault()
//             const formValues = getValues()

//             const updatedValues = [
//               {
//                 school: '',
//                 degree: '',
//                 startYear: '',
//                 endYear: '',
//               } as UserEducation,
//               ...(formValues.userEducations || []),
//             ]

//             setRenderedFormValues(updatedValues)
//             setValue('userEducations', updatedValues)
//           }}
//         >
//           <p className="h4">Add education</p>
//         </button>

//         <Button disabled={isSubmitting}>
//           <p className="h4">Update educations</p>
//         </Button>
//       </form>
//     </Form>
//   )
// }

// const formatReqBody = (formItems: UserEducationsFormItems) => {
//   const formItemsNoUserId = formItems.map((formItem) => {
//     if ((formItem as UserEducation).userId) {
//       delete (formItem as UserEducation).userId
//     }
//     return formItem
//   })

//   const createFormItems: UserEducationsFormItem[] = formItemsNoUserId.filter(
//     (formItem) => !(formItem as UserEducation).id
//   )

//   const createReqBody: CreateUserEducationsReqBody = {
//     userEducations: { create: createFormItems },
//   }

//   const updateReqsBodies: UpdateUserEducationsReqBody[] = formItemsNoUserId
//     .filter((formItem) => (formItem as UserEducation).id)
//     .map((formItem) => ({
//       userEducations: {
//         update: {
//           where: {
//             id: (formItem as UserEducation).id,
//           },
//           data: formItem as UserEducation,
//         },
//       },
//     }))

//   const formattedRequestBodies = {
//     ...(createFormItems.length
//       ? {
//           createReqBody,
//         }
//       : {}),
//     ...(updateReqsBodies.length
//       ? {
//           updateReqsBodies,
//         }
//       : {}),
//   }

//   return formattedRequestBodies
// }
