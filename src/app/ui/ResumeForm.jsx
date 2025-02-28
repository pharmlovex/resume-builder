"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function ResumeForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      summary: "",
      workExperience: [
        {
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          responsibilities: "",
          projects: [
            {
              name: "",
              description: "",
              technologies: "",
              achievements: "",
            },
          ],
        },
      ],
      education: [
        {
          school: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      skills: [""],
      certifications: [""],
    },
  });

  // Field arrays for handling dynamic arrays in the form
  const {
    fields: workFields,
    append: appendWork,
    remove: removeWork,
  } = useFieldArray({
    control,
    name: "workExperience",
  });

  // Nested field array for projects within work experience
  const handleAddProject = (index) => {
    const projectsFieldArray = useFieldArray({
      control,
      name: `workExperience.${index}.projects`,
    });
    projectsFieldArray.append({
      name: "",
      description: "",
      technologies: "",
      achievements: "",
    });
  };

  const { fields: educationFields, append: appendEducation } = useFieldArray({
    control,
    name: "education",
  });

  const { fields: skillFields, append: appendSkill } = useFieldArray({
    control,
    name: "skills",
  });

  const { fields: certificationFields, append: appendCertification } =
    useFieldArray({
      control,
      name: "certifications",
    });

  const onSubmit = (data) => {
    console.log(data);
    // Here you would handle form submission, e.g., generate the resume
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Resume Builder</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information Section */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-destructive text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phone && (
                  <p className="text-destructive text-sm">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="City, State"
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && (
                  <p className="text-destructive text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  type="url"
                  placeholder="https://www.linkedin.com/in/johndoe"
                  {...register("linkedin")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                placeholder="Brief overview of your professional background and key strengths"
                rows="4"
                {...register("summary", { required: "Summary is required" })}
              />
              {errors.summary && (
                <p className="text-destructive text-sm">
                  {errors.summary.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Work Experience Section */}
        <Card>
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {workFields.map((field, index) => {
              // Create a nested field array for projects
              const { fields: projectFields, append: appendProject } =
                useFieldArray({
                  control,
                  name: `workExperience.${index}.projects`,
                });

              return (
                <Card key={field.id} className="border border-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Position {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`jobTitle-${index}`}>Job Title</Label>
                        <Input
                          id={`jobTitle-${index}`}
                          placeholder="Senior Developer"
                          {...register(`workExperience.${index}.jobTitle`, {
                            required: "Job title is required",
                          })}
                        />
                        {errors.workExperience?.[index]?.jobTitle && (
                          <p className="text-destructive text-sm">
                            {errors.workExperience[index].jobTitle.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`company-${index}`}>Company</Label>
                        <Input
                          id={`company-${index}`}
                          placeholder="ABC Corporation"
                          {...register(`workExperience.${index}.company`, {
                            required: "Company is required",
                          })}
                        />
                        {errors.workExperience?.[index]?.company && (
                          <p className="text-destructive text-sm">
                            {errors.workExperience[index].company.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                        <Input
                          id={`startDate-${index}`}
                          placeholder="Jan 2020"
                          {...register(`workExperience.${index}.startDate`, {
                            required: "Start date is required",
                          })}
                        />
                        {errors.workExperience?.[index]?.startDate && (
                          <p className="text-destructive text-sm">
                            {errors.workExperience[index].startDate.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${index}`}>End Date</Label>
                        <Input
                          id={`endDate-${index}`}
                          placeholder="Present"
                          {...register(`workExperience.${index}.endDate`, {
                            required: "End date is required",
                          })}
                        />
                        {errors.workExperience?.[index]?.endDate && (
                          <p className="text-destructive text-sm">
                            {errors.workExperience[index].endDate.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`responsibilities-${index}`}>
                        Responsibilities
                      </Label>
                      <Textarea
                        id={`responsibilities-${index}`}
                        placeholder="Describe your key responsibilities and achievements"
                        rows="3"
                        {...register(
                          `workExperience.${index}.responsibilities`
                        )}
                      />
                    </div>

                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <h4 className="text-base font-medium">Projects</h4>
                        <Separator className="flex-1 mx-4" />
                      </div>

                      {projectFields.map((project, projectIndex) => (
                        <Card
                          key={project.id}
                          className="border border-muted bg-muted/20"
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                              Project {projectIndex + 1}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="space-y-2">
                              <Label
                                htmlFor={`project-name-${index}-${projectIndex}`}
                                className="text-sm"
                              >
                                Project Name
                              </Label>
                              <Input
                                id={`project-name-${index}-${projectIndex}`}
                                placeholder="Project Name"
                                {...register(
                                  `workExperience.${index}.projects.${projectIndex}.name`
                                )}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor={`project-description-${index}-${projectIndex}`}
                                className="text-sm"
                              >
                                Description
                              </Label>
                              <Textarea
                                id={`project-description-${index}-${projectIndex}`}
                                placeholder="Brief description of the project"
                                rows="2"
                                {...register(
                                  `workExperience.${index}.projects.${projectIndex}.description`
                                )}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor={`technologies-${index}-${projectIndex}`}
                                className="text-sm"
                              >
                                Technologies
                              </Label>
                              <Input
                                id={`technologies-${index}-${projectIndex}`}
                                placeholder="React, Node.js, MongoDB, etc."
                                {...register(
                                  `workExperience.${index}.projects.${projectIndex}.technologies`
                                )}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor={`achievements-${index}-${projectIndex}`}
                                className="text-sm"
                              >
                                Achievements
                              </Label>
                              <Textarea
                                id={`achievements-${index}-${projectIndex}`}
                                placeholder="Key achievements or metrics"
                                rows="2"
                                {...register(
                                  `workExperience.${index}.projects.${projectIndex}.achievements`
                                )}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <div className="flex justify-center">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            appendProject({
                              name: "",
                              description: "",
                              technologies: "",
                              achievements: "",
                            })
                          }
                        >
                          Add Project
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendWork({
                  jobTitle: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  responsibilities: "",
                  projects: [],
                })
              }
            >
              Add Experience
            </Button>
          </CardFooter>
        </Card>

        {/* Education Section */}
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {educationFields.map((field, index) => (
              <Card key={field.id} className="border border-muted">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    Education {index + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`school-${index}`}>
                        School/University
                      </Label>
                      <Input
                        id={`school-${index}`}
                        placeholder="University of Example"
                        {...register(`education.${index}.school`, {
                          required: "School is required",
                        })}
                      />
                      {errors.education?.[index]?.school && (
                        <p className="text-destructive text-sm">
                          {errors.education[index].school.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`degree-${index}`}>Degree</Label>
                      <Input
                        id={`degree-${index}`}
                        placeholder="Bachelor of Science"
                        {...register(`education.${index}.degree`, {
                          required: "Degree is required",
                        })}
                      />
                      {errors.education?.[index]?.degree && (
                        <p className="text-destructive text-sm">
                          {errors.education[index].degree.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`fieldOfStudy-${index}`}>
                        Field of Study
                      </Label>
                      <Input
                        id={`fieldOfStudy-${index}`}
                        placeholder="Computer Science"
                        {...register(`education.${index}.fieldOfStudy`)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor={`eduStartDate-${index}`}>
                          Start Date
                        </Label>
                        <Input
                          id={`eduStartDate-${index}`}
                          placeholder="2016"
                          {...register(`education.${index}.startDate`)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`eduEndDate-${index}`}>End Date</Label>
                        <Input
                          id={`eduEndDate-${index}`}
                          placeholder="2020"
                          {...register(`education.${index}.endDate`)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`eduDescription-${index}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`eduDescription-${index}`}
                      placeholder="Relevant coursework, achievements, or activities"
                      rows="2"
                      {...register(`education.${index}.description`)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendEducation({
                  school: "",
                  degree: "",
                  fieldOfStudy: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
            >
              Add Education
            </Button>
          </CardFooter>
        </Card>

        {/* Skills Section */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillFields.map((field, index) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={`skill-${index}`} className="sr-only">
                    Skill {index + 1}
                  </Label>
                  <Input
                    id={`skill-${index}`}
                    placeholder="JavaScript, Project Management, etc."
                    {...register(`skills.${index}`)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => appendSkill("")}
            >
              Add Skill
            </Button>
          </CardFooter>
        </Card>

        {/* Certifications Section */}
        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {certificationFields.map((field, index) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={`certification-${index}`} className="sr-only">
                    Certification {index + 1}
                  </Label>
                  <Input
                    id={`certification-${index}`}
                    placeholder="AWS Certified Solutions Architect, Google Analytics, etc."
                    {...register(`certifications.${index}`)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => appendCertification("")}
            >
              Add Certification
            </Button>
          </CardFooter>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button type="submit" size="lg">
            Generate Resume
          </Button>
        </div>
      </form>
    </div>
  );
}
