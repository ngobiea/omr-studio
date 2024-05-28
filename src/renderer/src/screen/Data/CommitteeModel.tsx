import * as React from 'react'
import { Button, Card, Label, TextInput, Checkbox } from 'flowbite-react' // Assuming this is your UI library
//import { FM } from '@renderer/utils/i18helper'

interface CommitteeModalProps {
  isOpen: boolean
  onClose: () => void
}

const CommitteeModal: React.FC<CommitteeModalProps> = ({ isOpen, onClose }) => {
  const handleSubmit = () => {
    // Logic to save data
    console.log('Adding data:', formData)
    onClose() // Close the modal after submission
  }

  const [formData, setFormData] = React.useState<any>({})

  // Handle changes in form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  return (
    <>
      {isOpen && (
        <Card className="max-w-screen-sm flex justify-center mt-10 ml-auto mr-auto">
          <h4 className="font-bold mb-4 ml-auto mr-auto dark:border-zinc-500">
            Examination Committee
          </h4>
          <hr />
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 ml-auto mr-auto">
              <Label htmlFor="committee">Number of Committee</Label>
              <TextInput
                id="committee"
                type="number"
                name="committeeName"
                value={formData.committeeName || ''}
                onChange={handleChange}
                required
                style={{ width: '70px', height: '30px', borderRadius: '20px' }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Label htmlFor="remember" className="text-lg">
                  Start over by deleting previous committee
                </Label>
                <Checkbox id="remember" className="ml-auto" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Label htmlFor="remember">Distribute the number of students</Label>
                <Checkbox id="remember" className="ml-auto" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Label htmlFor="remember" className="text-md">
                  Distribute the number of students
                </Label>
                <Checkbox id="remember" className="ml-auto" />
              </div>
            </div>

            <div className="flex">
              <Button type="submit" className="rounded-full" >
                Add Committee
              </Button>
              <Button onClick={onClose} className="ml-auto rounded-full">
                Cancellation
              </Button>
            </div>
          </form>
          <hr />
          <div>
            <p>
              A set of committees can be addet, taking a sequential number and the numbering
              continues from the last committee when adding more
            </p>
          </div>
        </Card>
      )}
    </>
  )
}

export default CommitteeModal
