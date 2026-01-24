import os

pages = [
    {
        "path": "app/in/stamp-duty-calculator/page.tsx",
        "component": "StampDutyCalculator",
        "import_path": "@/components/calculators/real-estate/StampDutyCalculator",
        "title": "Stamp Duty & Registration Charges Calculator",
        "desc": "Calculate Stamp Duty and Registration charges for property in India. Estimate the total government fees for your property purchase."
    },
    {
        "path": "app/in/property-tax-calculator/page.tsx",
        "component": "PropertyTaxCalculator",
        "import_path": "@/components/calculators/real-estate/PropertyTaxCalculator",
        "title": "Property Tax Calculator - Municipal Tax Estimate",
        "desc": "Estimate your annual property tax based on rateable value and local tax rates. Supports general tax and cess calculations."
    },
    {
        "path": "app/in/electricity-bill-calculator/page.tsx",
        "component": "ElectricityBillCalculator",
        "import_path": "@/components/calculators/real-estate/ElectricityBillCalculator",
        "title": "Electricity Bill Calculator",
        "desc": "Estimate your monthly electricity bill based on unit consumption (kWh) and slab rates. Includes fixed charges."
    },
    {
        "path": "app/in/water-bill-calculator/page.tsx",
        "component": "WaterBillCalculator",
        "import_path": "@/components/calculators/real-estate/WaterBillCalculator",
        "title": "Water Bill Calculator",
        "desc": "Calculate your water bill based on consumption volume (kL) and local tariff rates. Includes sewerage charge estimation."
    },
    {
        "path": "app/in/lpg-subsidy-calculator/page.tsx",
        "component": "LPGSubsidyCalculator",
        "import_path": "@/components/calculators/real-estate/LPGSubsidyCalculator",
        "title": "LPG Subsidy Calculator",
        "desc": "Calculate your total annual LPG subsidy and savings. Compare market price vs subsidized price for domestic cylinders."
    }
]

template = """import {{ Metadata }} from 'next';
import {component} from '{import_path}';

export const metadata: Metadata = {{
  title: '{title} | CostSmart',
  description: '{desc}',
  alternates: {{
    canonical: 'https://cost-smart-five.vercel.app{url_path}',
  }},
}};

export default function Page() {{
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{title}</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">{desc}</p>
      </div>

      <{component} />

      <article className="prose prose-slate lg:prose-lg mx-auto mt-16">
        <h2>About this calculator</h2>
        <p>
            This tool helps you estimate essential costs related to property and utilities.
            Simply enter your consumption or property details to get an instant estimate.
        </p>
        <h3>Disclaimer</h3>
        <p>
            Rates for utilities and taxes vary significantly by state and municipality.
            Please verify the exact rates with your local service provider or government body.
        </p>
      </article>
    </div>
  );
}}
"""

for page in pages:
    # Ensure directory exists
    dir_path = os.path.dirname(page['path'])
    os.makedirs(dir_path, exist_ok=True)

    # Extract URL path from file path
    url_path = page['path'].replace('app', '').replace('/page.tsx', '')

    content = template.format(
        component=page['component'],
        import_path=page['import_path'],
        title=page['title'],
        desc=page['desc'],
        url_path=url_path
    )

    with open(page['path'], 'w') as f:
        f.write(content)

    print(f"Created {page['path']}")
