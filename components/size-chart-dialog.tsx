"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ruler } from "lucide-react"

interface SizeChartDialogProps {
  type: "footwear" | "clothing"
  category?: "men" | "women" | "kids"
}

export default function SizeChartDialog({ type, category = "men" }: SizeChartDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Ruler className="h-4 w-4" />
          <span>Size Chart</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Size Chart</DialogTitle>
          <DialogDescription>Find your perfect fit with our comprehensive size guide</DialogDescription>
        </DialogHeader>

        {type === "footwear" ? <FootwearSizeChart category={category} /> : <ClothingSizeChart category={category} />}

        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium mb-2">How to Measure</h3>
          {type === "footwear" ? (
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>Place a piece of paper on a hard floor against a wall.</li>
              <li>Stand on the paper with your heel against the wall.</li>
              <li>Mark the longest part of your foot on the paper.</li>
              <li>Measure the distance from the wall to the mark in centimeters or inches.</li>
              <li>Use our size chart to find your perfect fit.</li>
            </ol>
          ) : (
            <ul className="space-y-1 text-sm">
              <li>
                <strong>Chest/Bust:</strong> Measure around the fullest part of your chest/bust.
              </li>
              <li>
                <strong>Waist:</strong> Measure around your natural waistline.
              </li>
              <li>
                <strong>Hip:</strong> Measure around the fullest part of your hips.
              </li>
              <li>
                <strong>Inseam:</strong> Measure from the crotch to the bottom of the leg.
              </li>
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function FootwearSizeChart({ category }: { category: "men" | "women" | "kids" }) {
  return (
    <div className="mt-4">
      <Tabs defaultValue={category}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="men">Men</TabsTrigger>
          <TabsTrigger value="women">Women</TabsTrigger>
          <TabsTrigger value="kids">Kids</TabsTrigger>
        </TabsList>

        <TabsContent value="men" className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">US</th>
                  <th className="border px-4 py-2 text-left">UK</th>
                  <th className="border px-4 py-2 text-left">EU</th>
                  <th className="border px-4 py-2 text-left">CM</th>
                  <th className="border px-4 py-2 text-left">Foot Length (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">7</td>
                  <td className="border px-4 py-2">6</td>
                  <td className="border px-4 py-2">40</td>
                  <td className="border px-4 py-2">25</td>
                  <td className="border px-4 py-2">9.8"</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">8</td>
                  <td className="border px-4 py-2">7</td>
                  <td className="border px-4 py-2">41</td>
                  <td className="border px-4 py-2">26</td>
                  <td className="border px-4 py-2">10.2"</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">9</td>
                  <td className="border px-4 py-2">8</td>
                  <td className="border px-4 py-2">42</td>
                  <td className="border px-4 py-2">27</td>
                  <td className="border px-4 py-2">10.6"</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">10</td>
                  <td className="border px-4 py-2">9</td>
                  <td className="border px-4 py-2">43</td>
                  <td className="border px-4 py-2">28</td>
                  <td className="border px-4 py-2">11.0"</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">11</td>
                  <td className="border px-4 py-2">10</td>
                  <td className="border px-4 py-2">44</td>
                  <td className="border px-4 py-2">29</td>
                  <td className="border px-4 py-2">11.4"</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">12</td>
                  <td className="border px-4 py-2">11</td>
                  <td className="border px-4 py-2">45</td>
                  <td className="border px-4 py-2">30</td>
                  <td className="border px-4 py-2">11.8"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="women" className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">US</th>
                  <th className="border px-4 py-2 text-left">UK</th>
                  <th className="border px-4 py-2 text-left">EU</th>
                  <th className="border px-4 py-2 text-left">CM</th>
                  <th className="border px-4 py-2 text-left">Foot Length (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">5</td>
                  <td className="border px-4 py-2">3</td>
                  <td className="border px-4 py-2">35-36</td>
                  <td className="border px-4 py-2">22</td>
                  <td className="border px-4 py-2">8.7"</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">6</td>
                  <td className="border px-4 py-2">4</td>
                  <td className="border px-4 py-2">36-37</td>
                  <td className="border px-4 py-2">23</td>
                  <td className="border px-4 py-2">9.1"</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">7</td>
                  <td className="border px-4 py-2">5</td>
                  <td className="border px-4 py-2">37-38</td>
                  <td className="border px-4 py-2">24</td>
                  <td className="border px-4 py-2">9.4"</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">8</td>
                  <td className="border px-4 py-2">6</td>
                  <td className="border px-4 py-2">38-39</td>
                  <td className="border px-4 py-2">25</td>
                  <td className="border px-4 py-2">9.8"</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">9</td>
                  <td className="border px-4 py-2">7</td>
                  <td className="border px-4 py-2">39-40</td>
                  <td className="border px-4 py-2">26</td>
                  <td className="border px-4 py-2">10.2"</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">10</td>
                  <td className="border px-4 py-2">8</td>
                  <td className="border px-4 py-2">40-41</td>
                  <td className="border px-4 py-2">27</td>
                  <td className="border px-4 py-2">10.6"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="kids" className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">US</th>
                  <th className="border px-4 py-2 text-left">UK</th>
                  <th className="border px-4 py-2 text-left">EU</th>
                  <th className="border px-4 py-2 text-left">CM</th>
                  <th className="border px-4 py-2 text-left">Age (approx.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">10C</td>
                  <td className="border px-4 py-2">9</td>
                  <td className="border px-4 py-2">27</td>
                  <td className="border px-4 py-2">16.5</td>
                  <td className="border px-4 py-2">4-5 years</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">11C</td>
                  <td className="border px-4 py-2">10</td>
                  <td className="border px-4 py-2">28</td>
                  <td className="border px-4 py-2">17.1</td>
                  <td className="border px-4 py-2">5-6 years</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">12C</td>
                  <td className="border px-4 py-2">11</td>
                  <td className="border px-4 py-2">30</td>
                  <td className="border px-4 py-2">18.1</td>
                  <td className="border px-4 py-2">6-7 years</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">13C</td>
                  <td className="border px-4 py-2">12</td>
                  <td className="border px-4 py-2">31</td>
                  <td className="border px-4 py-2">19.1</td>
                  <td className="border px-4 py-2">7-8 years</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">1Y</td>
                  <td className="border px-4 py-2">13</td>
                  <td className="border px-4 py-2">32</td>
                  <td className="border px-4 py-2">20.0</td>
                  <td className="border px-4 py-2">8-9 years</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">2Y</td>
                  <td className="border px-4 py-2">1</td>
                  <td className="border px-4 py-2">33</td>
                  <td className="border px-4 py-2">20.8</td>
                  <td className="border px-4 py-2">9-10 years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ClothingSizeChart({ category }: { category: "men" | "women" | "kids" }) {
  return (
    <div className="mt-4">
      <Tabs defaultValue={category}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="men">Men</TabsTrigger>
          <TabsTrigger value="women">Women</TabsTrigger>
          <TabsTrigger value="kids">Kids</TabsTrigger>
        </TabsList>

        <TabsContent value="men" className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Size</th>
                  <th className="border px-4 py-2 text-left">Chest (inches)</th>
                  <th className="border px-4 py-2 text-left">Waist (inches)</th>
                  <th className="border px-4 py-2 text-left">Hip (inches)</th>
                  <th className="border px-4 py-2 text-left">Sleeve Length (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">S</td>
                  <td className="border px-4 py-2">35-37</td>
                  <td className="border px-4 py-2">29-31</td>
                  <td className="border px-4 py-2">35-37</td>
                  <td className="border px-4 py-2">32-33</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">M</td>
                  <td className="border px-4 py-2">38-40</td>
                  <td className="border px-4 py-2">32-34</td>
                  <td className="border px-4 py-2">38-40</td>
                  <td className="border px-4 py-2">33-34</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">L</td>
                  <td className="border px-4 py-2">41-43</td>
                  <td className="border px-4 py-2">35-37</td>
                  <td className="border px-4 py-2">41-43</td>
                  <td className="border px-4 py-2">34-35</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">XL</td>
                  <td className="border px-4 py-2">44-46</td>
                  <td className="border px-4 py-2">38-40</td>
                  <td className="border px-4 py-2">44-46</td>
                  <td className="border px-4 py-2">35-36</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">XXL</td>
                  <td className="border px-4 py-2">47-49</td>
                  <td className="border px-4 py-2">41-43</td>
                  <td className="border px-4 py-2">47-49</td>
                  <td className="border px-4 py-2">36-37</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="women" className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Size</th>
                  <th className="border px-4 py-2 text-left">Bust (inches)</th>
                  <th className="border px-4 py-2 text-left">Waist (inches)</th>
                  <th className="border px-4 py-2 text-left">Hip (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">XS (0-2)</td>
                  <td className="border px-4 py-2">31-33</td>
                  <td className="border px-4 py-2">24-26</td>
                  <td className="border px-4 py-2">34-36</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">S (4-6)</td>
                  <td className="border px-4 py-2">34-36</td>
                  <td className="border px-4 py-2">27-29</td>
                  <td className="border px-4 py-2">37-39</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">M (8-10)</td>
                  <td className="border px-4 py-2">37-39</td>
                  <td className="border px-4 py-2">30-32</td>
                  <td className="border px-4 py-2">40-42</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">L (12-14)</td>
                  <td className="border px-4 py-2">40-42</td>
                  <td className="border px-4 py-2">33-35</td>
                  <td className="border px-4 py-2">43-45</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">XL (16-18)</td>
                  <td className="border px-4 py-2">43-45</td>
                  <td className="border px-4 py-2">36-38</td>
                  <td className="border px-4 py-2">46-48</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="kids" className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Size</th>
                  <th className="border px-4 py-2 text-left">Height (inches)</th>
                  <th className="border px-4 py-2 text-left">Weight (lbs)</th>
                  <th className="border px-4 py-2 text-left">Age (approx.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">4T</td>
                  <td className="border px-4 py-2">39-41</td>
                  <td className="border px-4 py-2">35-39</td>
                  <td className="border px-4 py-2">4 years</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">5T</td>
                  <td className="border px-4 py-2">42-44</td>
                  <td className="border px-4 py-2">40-44</td>
                  <td className="border px-4 py-2">5 years</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">6</td>
                  <td className="border px-4 py-2">45-47</td>
                  <td className="border px-4 py-2">45-49</td>
                  <td className="border px-4 py-2">6 years</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">7</td>
                  <td className="border px-4 py-2">48-50</td>
                  <td className="border px-4 py-2">50-54</td>
                  <td className="border px-4 py-2">7 years</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">8</td>
                  <td className="border px-4 py-2">51-53</td>
                  <td className="border px-4 py-2">55-64</td>
                  <td className="border px-4 py-2">8 years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

