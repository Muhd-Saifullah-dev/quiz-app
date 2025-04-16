"use client"
import { ICategoryStats } from '@/types/type'
import React from 'react'


interface Props{
    categoryData:ICategoryStats
}

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
import { formatedTime } from '@/utils/formatedTime'
 

function CategoryBarChart({categoryData}:Props) {
    const chartData = [
        { browser: "attempts", value:categoryData.attempts, fill: "var(--color-chrome)" },
        { browser: "completed", value:categoryData.completed, fill: "var(--color-safari)" },
        
      ]
      const chartConfig = {
        visitors: {
          label: "Attempts",
          color: "hsl(var(--chart-1))",
        },
        chrome: {
          label: "Completed",
          color: "hsl(var(--chart-2))",
        },
        safari: {
          label: "Safari",
          color: "hsl(var(--chart-2))",
        },
        firefox: {
          label: "Firefox",
          color: "hsl(var(--chart-3))",
        },
        edge: {
          label: "Edge",
          color: "hsl(var(--chart-4))",
        },
        other: {
          label: "Other",
          color: "hsl(var(--chart-5))",
        },
      } satisfies ChartConfig
  return (
    <Card className='border-2 shadow-[0_.3rem_0_0_rgba(0,0,0,0.1)]'>
    <CardHeader>
      <CardTitle>{categoryData.category?.name}</CardTitle>
      <CardDescription>Attempts vs Completion</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="key"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) =>
              chartConfig[value as keyof typeof chartConfig]?.label
            }
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar
            dataKey="value"
            strokeWidth={2}
            radius={8}
            
            activeBar={({ ...props }) => {
              return (
                <Rectangle
                  {...props}
                  fillOpacity={0.8}
                  stroke={props.payload.fill}
                  strokeDasharray={4}
                  strokeDashoffset={4}
                />
              )
            }}
          />
        </BarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter className="flex-col items-start gap-2 text-sm">
      <div className="flex gap-2 font-medium leading-none">
       Attempts on {formatedTime(categoryData.lastAttempt)} <TrendingUp className="h-4 w-4" />
      </div>
     
    </CardFooter>
  </Card>
  )
}

export default CategoryBarChart