import React, { useEffect, useState } from "react"
import {
    Button,
    Input,
    Label,
    Select,
    Table
} from "@medusajs/ui"
import { useAdminCustomPost, useAdminCustomQuery, useAdminCustomDelete } from "medusa-react"
import { Product } from "@medusajs/medusa"
import TrashIcon from "../../../../../fundamentals/icons/trash-icon"

type Props = {
    product: Product
}

function SizeGuide({ product }: Props) {


    const [tShirtSizes, setTShirtSizes] = useState([])
    const [newSize, setNewSize] = useState({
        fit: "regular",
        size: "",
        chest_min: "",
        chest_max: "",
        length: "",
        product_id: product.id
    })


    const { data, refetch } = useAdminCustomQuery(
        `/admin/t-shirt-sizes?product_id=${product.id}`,
        ["t-shirt-sizes"]
    )

    const createSize = useAdminCustomPost(
        `/admin/t-shirt-sizes`,
        ["t-shirt-sizes"]
    )

    useEffect(() => {
        if (data) {
            console.log(data.t_shirt_sizes)
            setTShirtSizes(data.t_shirt_sizes)
        }
    }, [data])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewSize(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (e) => {
        const { name, value } = e.target
        setNewSize(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log("sizes",newSize)
        await createSize.mutateAsync(newSize)
        refetch()
    }

    const CustomDeleteButton = ({ customId }: {customId:string}) => {
        const customDelete = useAdminCustomDelete(
            `/admin/t-shirt-sizes?id=${customId}`,
            ["t-shirt-sizes"]
        )

        const handleDelete = () => {
            customDelete.mutateAsync()
            refetch()
        }

        return (
            <Button
                variant="secondary"
                size="small"
                onClick={() => handleDelete()}
            >
                <TrashIcon size={16} />
            </Button>
        )

    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Sizes Guide Section</h1>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Fit</Table.HeaderCell>
                        <Table.HeaderCell>Size</Table.HeaderCell>
                        <Table.HeaderCell>Chest (cm)</Table.HeaderCell>
                        <Table.HeaderCell>Length (cm)</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tShirtSizes && tShirtSizes.map((size) => (
                        <Table.Row key={size.id}>
                            <Table.Cell>{size.fit}</Table.Cell>
                            <Table.Cell>{size.size}</Table.Cell>
                            <Table.Cell>{size.chest_min} - {size.chest_max}</Table.Cell>
                            <Table.Cell>{size.length}</Table.Cell>
                            <Table.Cell>
                                <CustomDeleteButton customId={size.id}  />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <h2 className="text-xl font-semibold">Add New Size</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="fit">Fit</Label>
                        <Select onValueChange={(value) => handleSelectChange({ target: { name: 'fit', value } })}>
                            <Select.Trigger>
                                <Select.Value placeholder="Select fit" />
                            </Select.Trigger>
                            <Select.Content>
                                <Select.Item value="regular">Regular</Select.Item>
                                <Select.Item value="oversize">Oversize</Select.Item>
                            </Select.Content>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="size">Size</Label>
                        <Input
                            id="size"
                            name="size"
                            value={newSize.size}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="chest_min">Min Chest (cm)</Label>
                        <Input
                            id="chest_min"
                            name="chest_min"
                            type="number"
                            value={newSize.chest_min}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="chest_max">Max Chest (cm)</Label>
                        <Input
                            id="chest_max"
                            name="chest_max"
                            type="number"
                            value={newSize.chest_max}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="length">Length (cm)</Label>
                        <Input
                            id="length"
                            name="length"
                            type="number"
                            value={newSize.length}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <Button type="submit">
                    Add Size
                </Button>
            </form>
        </div>
    )
}

export default SizeGuide