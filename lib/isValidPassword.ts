export async function isValidPassword(
  password: string,
  hashedPassword: string
) {
  const computedHash = await hashPassword(password)
  return computedHash === hashedPassword
}

async function hashPassword(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password)
  )
  
  return Buffer.from(arrayBuffer).toString("base64")
}