import { register } from "@/lib/auth";
import { AuthFormData } from "@/components/auth/validation";
import { toast } from "react-hot-toast";

export async function registerUser(
  data: AuthFormData,
  options?: {
    onSuccess?: (res: any) => void;
    onError?: (err: any) => void;
  }
) {
  try {
    const res = await register({
      fullName: data.fullName || "",
      email: data.email,
      password: data.password!,
      phone: data.phone?.replace(/\s/g, "") || "",
    });

    options?.onSuccess?.(res);
    return res;
  } catch (err) {
    options?.onError?.(err);
    throw err;
  }
}
