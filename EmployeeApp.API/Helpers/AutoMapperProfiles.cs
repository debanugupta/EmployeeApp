using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeApp.API.Models;
using EmployeeApp.API.Dtos;

namespace EmployeeApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Employee, EmployeeForListDto>()
                .ForMember(dest => dest.Age, opt =>
                    opt.MapFrom(src => src.DateOfBirth.CalculateAge()))
                .ForMember(dest => dest.DesignationName, opt =>
                    opt.MapFrom(src => src.Designation.DesignationName))
                .ForMember(dest => dest.DateOfBirth, opt =>
                    opt.MapFrom(src => src.DateOfBirth.ToShortDateString()));
            CreateMap<Employee, EmployeeForDetailedDto>()
                .ForMember(dest => dest.DesignationName, opt =>
                    opt.MapFrom(src => src.Designation.DesignationName))
                .ForMember(dest => dest.Age, opt =>
                    opt.MapFrom(src => src.DateOfBirth.CalculateAge()))
                .ForMember(dest => dest.DateOfBirth, opt =>
                    opt.MapFrom(src => src.DateOfBirth.ToShortDateString()));
            CreateMap<EmployeeForUpdateDto, Employee>()
                .ForMember(dest => dest.LastActive, opt =>
                    opt.MapFrom(src => DateTime.Now));
            CreateMap<EmployeeForCreationDto, Employee>()
                .ForMember(dest => dest.LastActive, opt =>
                    opt.MapFrom(src => DateTime.Now));
            CreateMap<Employee, EmployeeForReturnDto>();

        }
    }
}
