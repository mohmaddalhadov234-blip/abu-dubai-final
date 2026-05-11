import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { name, rating, text } = body

  if (!name || name.trim().length < 2) {
    return NextResponse.json({ error: "Имя слишком короткое" }, { status: 400 })
  }
  if (!text || text.trim().length < 5) {
    return NextResponse.json({ error: "Отзыв слишком короткий" }, { status: 400 })
  }
  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Неверная оценка" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert([{ name: name.trim(), rating, text: text.trim() }])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
