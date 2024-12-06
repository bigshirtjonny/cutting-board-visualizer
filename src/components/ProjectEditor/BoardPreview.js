import React from 'react';

const BoardPreview = ({ projectData }) => {
  const kerf = parseFloat(projectData.kerf || 0);
  const length = parseFloat(projectData.length || 0);
  const currentWoods = projectData.woods || [];
  const steps = projectData.steps || [];

  function processSteps(data, width, flipDirection) {
    let newData = [];

    if (flipDirection === 'vertical') {
        // Step 1: Split rows into columns of the given width
        const totalWidth = data[0].reduce((sum, wood) => sum + wood.width, 0); // Assuming all rows have the same total width
        const numColumns = Math.ceil(totalWidth / width);

        // Initialize columns array
        const columns = Array.from({ length: numColumns }, () => []);

        // Distribute woods into columns
        data.forEach((row) => {
            let xOffset = 0; // Tracks the horizontal position within the row

            row.forEach(({ width: segmentWidth, length, color }) => {
                let remainingWidth = segmentWidth;

                while (remainingWidth > 0) {
                    const chunkWidth = Math.min(width - (xOffset % width), remainingWidth);
                    const columnIndex = Math.floor(xOffset / width);

                    // Ensure the column exists before pushing
                    if (!columns[columnIndex]) {
                        columns[columnIndex] = [];
                    }

                    columns[columnIndex].push({ width: chunkWidth, length, color });

                    xOffset += chunkWidth;
                    remainingWidth -= chunkWidth;
                }
            });
        });

        // Step 2: Flip colors in odd-indexed columns
        columns.forEach((column, columnIndex) => {
            if (columnIndex % 2 === 1) {
                column.reverse();
            }
        });

        // Step 3: Reconstruct rows from columns
        const maxRows = data.length;
        newData = Array.from({ length: maxRows }, () => []);

        for (let rowIndex = 0; rowIndex < maxRows; rowIndex++) {
            columns.forEach((column) => {
                if (rowIndex < column.length) {
                    newData[rowIndex].push(column[rowIndex]);
                }
            });
        }
    }

    if (flipDirection === 'horizontal') {
        // Step 1: Split rows into smaller rows based on the given width
        let horizontalRows = [];
        data.forEach((row) => {
            let remainingLength = row[0].length; // Assuming all items in a row have the same length

            while (remainingLength > 0) {
                const chunkLength = Math.min(width, remainingLength);

                // Extract the appropriate segments for this chunk
                let newRow = row.map(({ width, color }) => ({
                    width,
                    length: chunkLength,
                    color,
                }));

                // Flip the segments for odd-indexed rows
                if (horizontalRows.length % 2 === 1) {
                    newRow = newRow.reverse();
                }

                horizontalRows.push(newRow);

                remainingLength -= chunkLength;
            }
        });

        newData = horizontalRows;
    }

    return newData;
}


  const processedWoods = () => {
    let wood = [];
    // handlle casee where  there is no wood
    if (currentWoods.length === 0) {
      return wood;
    }
    // handle case where there are no steps
    if (steps.length === 0) {
      // If there are no steps, return the initial woods as a double array
      let tempWoods = []; // Temporary array to hold the rows
      currentWoods.forEach((row) => {
        tempWoods.push({
          width: Number(row.dimensions.width),
          length: Number(length),
          color: row.color,
        });
      });
      
      // Add the row of wood pieces as a nested array
      wood.push(tempWoods); // wood becomes a double array
      return wood;
    }

    // handle cases where there are steps
    if (steps.length > 0) {
      let tempWoods = [];
      currentWoods.forEach((row) => {
        tempWoods.push({
          width: Number(row.dimensions.width),
          length: Number(length),
          color: row.color,
        });
      });
      wood.push(tempWoods);

      if (!steps[0].cutWidth || steps[0].cutWidth === 0){return []}
      
      let output = processSteps(wood, steps[0].cutWidth, steps[0].flipDirection);
      
      if (steps.length > 1) {
        steps.forEach((step, stepIndex) => {
          if (!step.cutWidth || step.cutWidth === 0){return []}
          if (stepIndex > 0) { 
            console.log("input",stepIndex,output)
            output = processSteps(output, step.cutWidth, step.flipDirection);
            console.log("output",stepIndex,output)
          }
        });
      }
      return output;
    }

    return [];
  };

  let processedWoodsArray = processedWoods();

  return (
    <div className="border rounded-md p-4 bg-white shadow">
      <h3 className="text-lg font-bold mb-4">Board Preview</h3>
      <div className="mt-4">
        {processedWoodsArray.length === 0 ? (
          <p className="text-sm text-gray-500">No woods added yet.</p>
        ) : (
          <div>
            {processedWoodsArray.map((woodRow, rowIndex) => (
              <div
                key={rowIndex}
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {woodRow.map((wood, woodIndex) => (
                  <div
                    key={woodIndex}
                    style={{
                      width: `${wood.width}px`,
                      height: `${wood.length}px`,
                      backgroundColor: wood.color,
                      display: "inline-block",
                    }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
};

export default BoardPreview;
