"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { doSocialLogin } from "action";
import { Checkbox } from "@/components/ui/checkbox";

const FormSchema = z.object({
	socialMethod: z.string().optional(),
});

export default function LoginForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			socialMethod: "LinkedIn",
		},
	});
	
	async function onSubmit(data: z.infer<typeof FormSchema>) {
		await doSocialLogin({ socialMethod: data.socialMethod ?? "LinkedIn" });
	}
	
	return (
		<div className="flex flex-col items-center justify-center h-screen">
		<Form {...form}>
		<form
		onSubmit={form.handleSubmit(onSubmit)}
		className="space-y-6 mx-auto max-w-md w-full"
		>
		<div className="flex flex-row items-center gap-3 flex-wrap">
		{["LinkedIn", "GitHub", "Google"].map((item, index) => (
			<FormField
			key={index}
			control={form.control}
			name="socialMethod"
			render={({ field }) => (
				<FormItem className="flex flex-row items-start space-x-3 space-y-0">
				<FormControl>
				<Checkbox
				checked={field.value === item}
				onCheckedChange={(checked) => {
					return checked
					? field.onChange(item)
					: field.onChange("");
				}}
				/>
				</FormControl>
				<FormLabel className="font-normal">{item}</FormLabel>
				</FormItem>
			)}
			/>
		))}
		</div>
		<Button type="submit">Submit</Button>
		</form>
		</Form>
		</div>
	);
}