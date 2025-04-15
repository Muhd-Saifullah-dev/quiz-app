import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {play} from "@/utils/icons.utils"
import { Select,SelectTrigger,SelectValue,SelectContent,SelectItem } from '@/components/ui/select'

function page() {
  return (
    <div className=' flex flex-col'>
      {/* Main Content - now using relative positioning */}
      <div className='flex-1 flex items-center justify-center p-4'>
        <div className='w-full max-w-2xl p-6 border-2 rounded-xl shadow-[0_.5rem_0_0_rgba(0,0,0,0.1)]'>
          <h1 className='text-4xl font-bold mb-6'>Quiz setup</h1>
          <div className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='questionCount' className='text-lg'>
                Number of Questions
              </Label>
              <Input type='number' min={1} id='questionCount' />
            </div>
            
            <div className='space-y-2'>
              <Label htmlFor='category' className='text-lg'>
                Category
              </Label>
              <Select disabled>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='general'>General Knowledge</SelectItem>
                  <SelectItem value='science'>Science</SelectItem>
                  <SelectItem value='history'>History</SelectItem>
                  <SelectItem value='geography'>Geography</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='difficulty' className='text-lg'>
                Difficulty
              </Label>
              <Select defaultValue='unspecified'>
                <SelectTrigger id='difficulty'>
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='unspecified'>Unspecified</SelectItem>
                  <SelectItem value='easy'>Easy</SelectItem>
                  <SelectItem value='medium'>Medium</SelectItem>
                  <SelectItem value='hard'>Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Button Container - now using normal flow with padding */}
      <div className="w-full absolute bottom-0 left-0 py-6 bg-white border-t-2">
  <div className="text-center">
    <Button variant={"blue"} className="px-10 py-6 font-bold text-white rounded-xl text-xl mx-auto"> 
      <span className="flex items-center justify-center gap-2">
        {play} Start
      </span>
    </Button>
  </div>
</div>
    </div>
  )
}

export default page