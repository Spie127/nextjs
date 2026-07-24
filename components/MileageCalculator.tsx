"use client";

import { useState } from "react";

type FuelType = "petrol" | "diesel";
type LastEdited = "fuel" | "total" | "price" | null;

const DEFAULT_PRICES: Record<FuelType, number> = {
  petrol: 197.25,
  diesel: 195.25,
};

const PRESETS = [
  { label: "City commute", distance: 15 },
  { label: "Kathmandu → Pokhara", distance: 200 },
  { label: "Weekend trip", distance: 80 },
];

export default function MileageCalculator() {
  const [fuelType, setFuelType] = useState<FuelType>("petrol");
  const [distance, setDistance] = useState("");
  const [fuel, setFuel] = useState("");
  const [price, setPrice] = useState(String(DEFAULT_PRICES.petrol));
  const [total, setTotal] = useState("");
  const [lastEdited, setLastEdited] = useState<LastEdited>(null);
  const [result, setResult] = useState<{
    distance: number;
    fuel: number;
    total: number;
    mileage: number;
    costPerKm: number;
  } | null>(null);

  function switchFuel(type: FuelType) {
    setFuelType(type);
    setPrice(String(DEFAULT_PRICES[type]));
    setFuel("");
    setTotal("");
    setDistance("");
    setResult(null);
    setLastEdited(null);
  }

  function recalc(nextFuel: string, nextTotal: string, nextPrice: string, edited: LastEdited) {
    const fuelNum = parseFloat(nextFuel);
    const totalNum = parseFloat(nextTotal);
    const priceNum = parseFloat(nextPrice);

    if (!priceNum || priceNum <= 0) return;

    if (edited === "fuel" && !isNaN(fuelNum)) {
      setTotal((fuelNum * priceNum).toFixed(2));
    } else if (edited === "total" && !isNaN(totalNum)) {
      setFuel((totalNum / priceNum).toFixed(2));
    } else if (edited === "price") {
      if (!isNaN(fuelNum)) {
        setTotal((fuelNum * priceNum).toFixed(2));
      } else if (!isNaN(totalNum)) {
        setFuel((totalNum / priceNum).toFixed(2));
      }
    }
    setResult(null);
  }

  function handleFuelChange(value: string) {
    setFuel(value);
    setLastEdited("fuel");
    recalc(value, total, price, "fuel");
  }

  function handleTotalChange(value: string) {
    setTotal(value);
    setLastEdited("total");
    recalc(fuel, value, price, "total");
  }

  function handlePriceChange(value: string) {
    setPrice(value);
    setLastEdited("price");
    recalc(fuel, total, value, "price");
  }

  function applyPreset(dist: number) {
    setDistance(String(dist));
    setFuel("");
    setTotal("");
    setResult(null);
  }

  function calculate() {
    const d = parseFloat(distance);
    const f = parseFloat(fuel);
    const t = parseFloat(total);

    if (!d || !f || !t) {
      alert("Please fill distance, fuel used, and price or total cost.");
      return;
    }

    setResult({
      distance: d,
      fuel: f,
      total: t,
      mileage: d / f,
      costPerKm: t / d,
    });
  }

  function reset() {
    setDistance("");
    setFuel("");
    setTotal("");
    setPrice(String(DEFAULT_PRICES[fuelType]));
    setLastEdited(null);
    setResult(null);
  }

  return (
    <div className="grid gap-8 border border-line p-6 md:grid-cols-2 md:p-8">
      <div>
        {/* Fuel type switch */}
        <div className="flex border border-line">
          {(["petrol", "diesel"] as FuelType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => switchFuel(type)}
              className={`focus-ring flex-1 py-2 font-display text-sm font-medium capitalize transition ${
                fuelType === type
                  ? "bg-ink text-paper"
                  : "text-ink/70 hover:bg-marigold/10"
              }`}
            >
              {type} — Rs {DEFAULT_PRICES[type]}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-wide text-ink/60">
              Distance (km)
            </span>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="e.g., 120"
              min={0}
              step={0.1}
              className="focus-ring mt-1 w-full border border-line bg-transparent px-3 py-2 font-mono text-sm text-ink"
            />
          </label>

          <label className="block">
            <span className="font-mono text-xs uppercase tracking-wide text-ink/60">
              Fuel Used (litre)
            </span>
            <input
              type="number"
              value={fuel}
              onChange={(e) => handleFuelChange(e.target.value)}
              placeholder="e.g., 5"
              min={0}
              step={0.01}
              className="focus-ring mt-1 w-full border border-line bg-transparent px-3 py-2 font-mono text-sm text-ink"
            />
          </label>

          <label className="block">
            <span className="font-mono text-xs uppercase tracking-wide text-ink/60">
              Fuel Price per Litre (NPR)
            </span>
            <input
              type="number"
              value={price}
              onChange={(e) => handlePriceChange(e.target.value)}
              min={0}
              step={0.01}
              className="focus-ring mt-1 w-full border border-line bg-transparent px-3 py-2 font-mono text-sm text-ink"
            />
          </label>

          <label className="block">
            <span className="font-mono text-xs uppercase tracking-wide text-ink/60">
              Total Fuel Cost (NPR)
            </span>
            <input
              type="number"
              value={total}
              onChange={(e) => handleTotalChange(e.target.value)}
              placeholder="Optional"
              min={0}
              step={0.01}
              className="focus-ring mt-1 w-full border border-line bg-transparent px-3 py-2 font-mono text-sm text-ink"
            />
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={calculate}
              className="focus-ring flex-1 bg-ink px-4 py-2 font-display text-sm font-medium text-paper hover:bg-vermilion"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={reset}
              className="focus-ring border border-line px-4 py-2 font-display text-sm font-medium text-ink/70 hover:border-ink"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Trip presets */}
        <div className="mt-6">
          <span className="font-mono text-xs uppercase tracking-wide text-ink/60">
            Trip Presets
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => applyPreset(p.distance)}
                className="focus-ring border border-line px-3 py-1.5 font-mono text-xs text-ink/70 hover:border-vermilion hover:text-vermilion"
              >
                {p.label} · {p.distance}km
              </button>
            ))}
            <button
              type="button"
              onClick={() => applyPreset(0)}
              className="focus-ring border border-line px-3 py-1.5 font-mono text-xs text-ink/70 hover:border-vermilion hover:text-vermilion"
            >
              Custom Trip
            </button>
          </div>
        </div>
      </div>

      {/* Result panel */}
      <div className="border border-line bg-marigold/5 p-6">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
          Result
        </h3>
        {result ? (
          <dl className="mt-4 flex flex-col gap-3">
            {[
              ["Distance", `${result.distance.toFixed(2)} km`],
              ["Fuel Used", `${result.fuel.toFixed(2)} L`],
              ["Total Cost", `Rs ${result.total.toFixed(2)}`],
              ["Mileage", `${result.mileage.toFixed(2)} km/l`],
              ["Fuel Cost per KM", `Rs ${result.costPerKm.toFixed(2)}`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between border-b border-line/60 pb-2">
                <dt className="font-body text-sm text-ink/70">{label}</dt>
                <dd className="font-mono text-sm font-medium text-indigo">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-4 font-body text-sm text-ink/50">
            Fill in the fields and click Calculate to see your mileage and
            cost per kilometer.
          </p>
        )}
      </div>
    </div>
  );
}
