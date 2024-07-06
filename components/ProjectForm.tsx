"use client";
import { SessionInterface } from "@/grafbase/common.types";
import Image from "next/image";
import React, {useState} from "react";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import ButtonComp from "./ButtonComp";
import { fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
  session: SessionInterface;
};


type formTypes = {
  image: string;
  title: string;
  description: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

const ProjectForm = ({ type, session }: Props) => {

  const [form, setForm] = useState<formTypes>({
    image: "",
    title: "",
    description: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: ""
  })

  const router = useRouter()


  const serverUrl = process.env.NEXT_PUBLIC_NEXT_AUTH_URL

  const uploadImage = async (imagePath: string) => {
    try {
       const response = await fetch(`${serverUrl}/api/upload`, {
        method: 'POST',
        body: JSON.stringify({ path: imagePath })
       })

       return response.json()
    } catch (error) {
      throw error
    }
  }

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)


  const handleSubmitForm = async(e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    const imageUrl = await uploadImage(form.image)

    const { token } = await fetchToken()

    if(imageUrl.url) {
      window.alert('Image uploaded successfully')
      const results = {
        image: imageUrl.url,
        tokenValue: token
      }
      console.log('Submit results', results)
    }

    try {
      if(type === 'create') {
        console.log('Created project')
        router.push('/')
      }
      setIsSubmitting(false)
    } catch(err) {
      console.error(`Failed to ${type}!`)
      setIsSubmitting(false)
    } finally {
      setIsSubmitting(false)
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const file = e.target.files?.[0]

    if(!file) return;
    
    if(!file.type.includes('image')) {
      return alert('Please upload an image file')
    }

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange('image', result)
    }


  };



  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }))
  };


  return (
    <form onSubmit={handleSubmitForm} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          type="file"
          name="poster"
          id="image"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={(e) =>handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="Project poster"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        setState={(value) => handleStateChange("description", value)}
      />

      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://livesiteurl.com"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField
        type="url"
        title="Github URL"
        state={form.githubUrl}
        placeholder="https://linktogithub.com/project"
        setState={(value) => handleStateChange("githubUrl", value)}
      />
  

      {/* Custom Category...*/}
       
      <CustomMenu 
      title="Category"
      state={form.category}
      filters={categoryFilters}
      setState={(value) => handleStateChange('category', value)}
      />

      <div className="flexStart w-full" >
        <ButtonComp
        title={ isSubmitting ? `${type === 'create' ? 'Creating' : 'Editing'}` : `${type === 'create' ? 'Create' : 'Edit'}` }
        type="submit"
        leftIcon={isSubmitting ? "": "/plus.svg"}
        isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
