using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PythonAcademy.Data;
using PythonAcademy.Models.Constants;
using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories;
using PythonAcademy.Seed;
using PythonAcademy.Services.UserServices;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();


builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n
                        Enter 'Bearer' [space] and then your token in the text input below.
                        \r\n\r\nExample: 'Bearer 12345abcdef'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name="Bearer",
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
       });
});


builder.Services.AddDbContext<Context>(options => options.UseSqlServer("Data Source=ALEX-SETUP\\MSSQLSERVER01;Initial Catalog=PythonAcademyDatabase;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False"));

builder.Services.AddIdentity<User, Role>()
    .AddEntityFrameworkStores<Context>()
    .AddDefaultTokenProviders();

builder.Services.AddScoped<IUserServices, UserServices>();

//repositories
builder.Services.AddTransient<IRepositoryWrapper, RepositoryWrapper>();
builder.Services.AddScoped<SeedDb>();



builder.Services.AddAuthorization(option =>
{
    option.AddPolicy(UserRolesType.Admin, policy => policy.RequireRole(UserRolesType.Admin));
    option.AddPolicy(UserRolesType.Student, policy => policy.RequireRole(UserRolesType.Student));
});

builder.Services.AddAuthentication(auth => //schema pt token
{
    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    auth.DefaultChallengeScheme= JwtBearerDefaults.AuthenticationScheme;
    auth.DefaultScheme= JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime= true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is my custom secret key for users")),
            ValidateIssuerSigningKey = true
        };
        options.Events = new JwtBearerEvents()
        {
            OnTokenValidated = PythonAcademy.Helpers.SessionTokenValidator.ValidateSessionToken
        };
    });



builder.Services.AddControllersWithViews() //ignorare ciclari
    .AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

//cereri din front
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors();
   
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

//seeding database
var roleManager = app.Services.GetService<RoleManager<Role>>();
var context = app.Services.GetService<Context>();
var seed = new SeedDb(roleManager, context);
seed.SeedRoles().Wait();





