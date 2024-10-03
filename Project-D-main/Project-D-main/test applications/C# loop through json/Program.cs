using System;
using System.IO;
using System.Text.Json;
using Microsoft.VisualBasic;

public class LoopJson
{
    public static string JsonString = "./data.json";
    public static void loopcontrols(JsonElement controls)
    {
        foreach (JsonElement element in controls.EnumerateArray())
        {
            Console.WriteLine("test");
            if (element.ValueKind == JsonValueKind.Object)
            {
                foreach (JsonProperty property in element.EnumerateObject())
                {
                    if (property.Name == "controls") loopcontrols(property.Value);
                    if (property.Name == "label") Console.WriteLine(property.Value);
                }
            }
        }
    }

    public static void Main()
    {
        string json = File.ReadAllText(JsonString);
        JsonDocument doc = JsonDocument.Parse(json);
        JsonElement root = doc.RootElement;
        foreach (JsonProperty property in root.EnumerateObject())
        {
            if (property.Name == "title") Console.WriteLine(property.Value);
            if (property.Name == "controls") loopcontrols(property.Value);
        }
    }
}
